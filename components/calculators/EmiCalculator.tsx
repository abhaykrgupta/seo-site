"use client"

import React, { useMemo, useState, useEffect, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import {
  ArrowRight,
  Landmark,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Link2,
  Lightbulb,
  Sliders,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  calcEmi,
  calcWhatIfComparison,
  generateEmiInsights,
  fmtCurrency,
  fmtMonths,
  type WhatIfParams,
} from "@/lib/emi-insights"

// ─── Schema ───────────────────────────────────────────────────────────────

const schema = z.object({
  amount: z
    .number()
    .min(100000, "Minimum ₹1,00,000")
    .max(50000000, "Maximum ₹5,00,00,000"),
  rate: z
    .number()
    .min(0.1, "Minimum 0.1%")
    .max(25, "Maximum 25%"),
  tenure: z
    .number()
    .min(1, "Minimum 1 year")
    .max(30, "Maximum 30 years"),
})

type EmiFormValues = z.infer<typeof schema>

interface SimulatorState {
  extraPayment: number  // absolute ₹/month
  rateAdjust: number    // percentage points delta from base (-5 to +5)
  tenureAdjust: number  // years delta from base (-20 to +20)
}

// ─── Constants ────────────────────────────────────────────────────────────

const CHART_COLORS = {
  principal: "#2563eb",
  interest: "#d97706",
}

// ─── Formatters ───────────────────────────────────────────────────────────

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val)

const formatInputCurrency = (val: number) =>
  new Intl.NumberFormat("en-IN").format(val)

// ─── RangeSlider ──────────────────────────────────────────────────────────

interface RangeSliderProps {
  value: number
  min: string
  max: string
  step: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RangeSlider = ({ value, min, max, step, onChange }: RangeSliderProps) => (
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    value={value}
    onChange={onChange}
    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary mt-4"
  />
)

// ─── Component ────────────────────────────────────────────────────────────

export function EmiCalculator() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const initialized = useRef(false)

  const [showAmortization, setShowAmortization] = useState(false)
  const [shareStatus, setShareStatus] = useState<"idle" | "link" | "text">("idle")

  // URL-seeded defaults
  const defaultAmount = Number(searchParams.get("amount")) || 2500000
  const defaultRate = Number(searchParams.get("rate")) || 8.5
  const defaultTenure = Number(searchParams.get("tenure")) || 20

  const {
    control,
    watch,
    formState: { errors },
  } = useForm<EmiFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: defaultAmount, rate: defaultRate, tenure: defaultTenure },
    mode: "onChange",
  })

  const formValues = watch()

  // Simulator state — fully independent from react-hook-form
  const [simulator, setSimulator] = useState<SimulatorState>({
    extraPayment: Number(searchParams.get("extra")) || 0,
    rateAdjust: Number(searchParams.get("radj")) || 0,
    tenureAdjust: Number(searchParams.get("tadj")) || 0,
  })

  // ─── URL Sync ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      return
    }
    const params = new URLSearchParams()
    if (formValues.amount) params.set("amount", String(formValues.amount))
    if (formValues.rate) params.set("rate", String(formValues.rate))
    if (formValues.tenure) params.set("tenure", String(formValues.tenure))
    if (simulator.extraPayment > 0) params.set("extra", String(simulator.extraPayment))
    if (simulator.rateAdjust !== 0) params.set("radj", String(simulator.rateAdjust))
    if (simulator.tenureAdjust !== 0) params.set("tadj", String(simulator.tenureAdjust))
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [
    formValues.amount,
    formValues.rate,
    formValues.tenure,
    simulator.extraPayment,
    simulator.rateAdjust,
    simulator.tenureAdjust,
  ])

  // ─── Core Calculation ─────────────────────────────────────────────────

  const results = useMemo(() => {
    const p = Number(formValues.amount) || 0
    const r = (Number(formValues.rate) || 0) / 12 / 100
    const n = (Number(formValues.tenure) || 0) * 12

    if (p <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0, p: 0 }
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = emi * n
    const totalInterest = totalPayment - p

    return {
      emi: isNaN(emi) ? 0 : emi,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      p,
    }
  }, [formValues.amount, formValues.rate, formValues.tenure])

  // ─── Amortization Schedule ────────────────────────────────────────────

  const amortizationSchedule = useMemo(() => {
    if (results.emi <= 0) return []

    const r = (Number(formValues.rate) || 0) / 12 / 100
    const totalMonths = (Number(formValues.tenure) || 0) * 12
    let balance = Number(formValues.amount) || 0
    const schedule = []

    for (let year = 1; year <= (Number(formValues.tenure) || 0); year++) {
      let yearPrincipal = 0
      let yearInterest = 0
      const openingBalance = balance

      for (let month = 1; month <= 12; month++) {
        const monthNum = (year - 1) * 12 + month
        if (monthNum > totalMonths) break
        const interest = balance * r
        const principal = results.emi - interest
        yearInterest += interest
        yearPrincipal += principal
        balance = Math.max(0, balance - principal)
      }

      schedule.push({
        year,
        openingBalance,
        principal: yearPrincipal,
        interest: yearInterest,
        closingBalance: balance,
      })
    }

    return schedule
  }, [results.emi, formValues.amount, formValues.rate, formValues.tenure])

  // ─── Smart Insights ───────────────────────────────────────────────────

  const insights = useMemo(
    () =>
      generateEmiInsights(
        results.p,
        formValues.rate,
        formValues.tenure,
        results.emi,
        results.totalInterest
      ),
    [results.p, results.emi, results.totalInterest, formValues.rate, formValues.tenure]
  )

  // ─── What-If Comparison ───────────────────────────────────────────────

  const whatIfComparison = useMemo(() => {
    if (results.p <= 0) return null

    const hasChange =
      simulator.extraPayment > 0 ||
      simulator.rateAdjust !== 0 ||
      simulator.tenureAdjust !== 0

    if (!hasChange) return null

    const clampedRate = Math.max(0.1, Math.min(25, formValues.rate + simulator.rateAdjust))
    const clampedTenure = Math.max(1, Math.min(30, formValues.tenure + simulator.tenureAdjust))

    const base: WhatIfParams = {
      principal: results.p,
      annualRate: formValues.rate,
      tenureYears: formValues.tenure,
      extraPayment: 0,
    }
    const scenario: WhatIfParams = {
      principal: results.p,
      annualRate: clampedRate,
      tenureYears: clampedTenure,
      extraPayment: simulator.extraPayment,
    }

    return calcWhatIfComparison(base, scenario)
  }, [results.p, formValues.rate, formValues.tenure, simulator])

  // ─── Chart Data ───────────────────────────────────────────────────────

  const chartData = [
    { name: "Principal Amount", value: results.p, color: CHART_COLORS.principal },
    { name: "Total Interest", value: results.totalInterest, color: CHART_COLORS.interest },
  ]

  const interestPercent =
    results.totalPayment > 0
      ? Math.round((results.totalInterest / results.totalPayment) * 100)
      : 0

  // ─── Share Handlers ───────────────────────────────────────────────────

  const handleShareLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setShareStatus("link")
    setTimeout(() => setShareStatus("idle"), 2500)
  }

  const handleCopyText = async () => {
    const extraLine =
      simulator.extraPayment > 0
        ? `\nExtra Payment:   ${formatCurrency(simulator.extraPayment)}/mo`
        : ""
    const whatIfLine =
      whatIfComparison
        ? `\n\nWhat-If Scenario:\nScenario EMI:    ${formatCurrency(whatIfComparison.scenario.emi)}/mo\nInterest Saved:  ${formatCurrency(Math.abs(whatIfComparison.diff.interestSaved))}`
        : ""

    const text = [
      "── FinVault EMI Calculator Results ──",
      `Loan Amount:     ${formatCurrency(results.p)}`,
      `Interest Rate:   ${formValues.rate}% p.a.`,
      `Tenure:          ${formValues.tenure} years (${formValues.tenure * 12} payments)`,
      extraLine,
      "",
      `Monthly EMI:     ${formatCurrency(results.emi)}`,
      `Total Interest:  ${formatCurrency(results.totalInterest)}`,
      `Total Payment:   ${formatCurrency(results.totalPayment)}`,
      whatIfLine,
      "",
      `Calculated at:   ${window.location.href}`,
    ]
      .filter((l) => l !== "")
      .join("\n")

    await navigator.clipboard.writeText(text)
    setShareStatus("text")
    setTimeout(() => setShareStatus("idle"), 2500)
  }

  const clampedWhatIfRate = Math.max(
    0.1,
    Math.min(25, formValues.rate + simulator.rateAdjust)
  )
  const clampedWhatIfTenure = Math.max(
    1,
    Math.min(30, formValues.tenure + simulator.tenureAdjust)
  )

  // ─── Render ───────────────────────────────────────────────────────────

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full mt-8 items-start">

      {/* ── LEFT COLUMN ── */}
      <div className="lg:col-span-7 space-y-8">

        {/* 1. Configure Loan Details */}
        <Card className="border-border bg-background shadow-sm">
          <CardContent className="p-6 md:p-8 space-y-8">
            <h3 className="heading-3 text-2xl mb-2">Configure Loan Details</h3>

            {/* Loan Amount */}
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-foreground">Loan Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                      <Input
                        type="number"
                        min={100000}
                        max={50000000}
                        step={10000}
                        value={field.value === 0 ? "" : field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        onBlur={field.onBlur}
                        className="h-10 text-lg w-36 pl-7 font-semibold text-right"
                      />
                    </div>
                  </div>
                  <RangeSlider
                    min="100000" max="50000000" step="10000"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹1L</span><span>₹5Cr</span>
                  </div>
                  {errors.amount && (
                    <p className="text-xs text-red-500 font-medium">{errors.amount.message}</p>
                  )}
                </div>
              )}
            />

            {/* Interest Rate */}
            <Controller
              name="rate"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-foreground">Interest Rate (% p.a.)</label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.1"
                        min={0.1}
                        max={25}
                        value={field.value === 0 ? "" : field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        onBlur={field.onBlur}
                        className="h-10 text-lg w-28 pr-7 font-semibold text-right"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                    </div>
                  </div>
                  <RangeSlider
                    min="0.1" max="25" step="0.1"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.1%</span><span>25%</span>
                  </div>
                  {errors.rate && (
                    <p className="text-xs text-red-500 font-medium">{errors.rate.message}</p>
                  )}
                </div>
              )}
            />

            {/* Tenure */}
            <Controller
              name="tenure"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-foreground">Loan Tenure</label>
                    <div className="relative">
                      <Input
                        type="number"
                        min={1}
                        max={30}
                        step={1}
                        value={field.value === 0 ? "" : field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        onBlur={field.onBlur}
                        className="h-10 text-lg w-28 pr-10 font-semibold text-right"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">Yrs</span>
                    </div>
                  </div>
                  <RangeSlider
                    min="1" max="30" step="1"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 yr</span><span>30 yrs</span>
                  </div>
                  {errors.tenure && (
                    <p className="text-xs text-red-500 font-medium">{errors.tenure.message}</p>
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>

        {/* 2. What-If Simulator */}
        {results.p > 0 && (
          <Card className="border-border bg-background shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-primary" />
                  What-If Simulator
                </CardTitle>
                <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                  Interactive
                </span>
              </div>
              <p className="text-sm text-muted-foreground pt-1">
                Explore how changes to your loan affect total cost.
              </p>
            </CardHeader>
            <CardContent className="space-y-6 pb-8">

              {/* Extra Monthly Payment */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-foreground">Extra Monthly Payment</label>
                  <span className="text-sm font-bold text-primary">
                    {simulator.extraPayment > 0 ? `+${formatCurrency(simulator.extraPayment)}/mo` : "None"}
                  </span>
                </div>
                <RangeSlider
                  min="0" max="20000" step="500"
                  value={simulator.extraPayment}
                  onChange={(e) =>
                    setSimulator((s) => ({ ...s, extraPayment: Number(e.target.value) }))
                  }
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹0</span><span>₹20,000/mo</span>
                </div>
              </div>

              {/* Rate Adjustment */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-foreground">Rate Adjustment</label>
                  <span className="text-sm font-bold text-foreground">
                    {simulator.rateAdjust === 0 ? (
                      <span className="text-muted-foreground">No change</span>
                    ) : (
                      <>
                        <span className={simulator.rateAdjust < 0 ? "text-emerald-600" : "text-amber-600"}>
                          {simulator.rateAdjust > 0 ? "+" : ""}{simulator.rateAdjust.toFixed(1)}%
                        </span>
                        {" → "}
                        <span className="text-primary">{clampedWhatIfRate.toFixed(1)}%</span>
                      </>
                    )}
                  </span>
                </div>
                <RangeSlider
                  min="-5" max="5" step="0.1"
                  value={simulator.rateAdjust}
                  onChange={(e) =>
                    setSimulator((s) => ({ ...s, rateAdjust: Number(e.target.value) }))
                  }
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>−5%</span><span>+5%</span>
                </div>
              </div>

              {/* Tenure Adjustment */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-foreground">Tenure Adjustment</label>
                  <span className="text-sm font-bold text-foreground">
                    {simulator.tenureAdjust === 0 ? (
                      <span className="text-muted-foreground">No change</span>
                    ) : (
                      <>
                        <span className={simulator.tenureAdjust < 0 ? "text-emerald-600" : "text-amber-600"}>
                          {simulator.tenureAdjust > 0 ? "+" : ""}{simulator.tenureAdjust}y
                        </span>
                        {" → "}
                        <span className="text-primary">{clampedWhatIfTenure} years</span>
                      </>
                    )}
                  </span>
                </div>
                <RangeSlider
                  min="-20" max="20" step="1"
                  value={simulator.tenureAdjust}
                  onChange={(e) =>
                    setSimulator((s) => ({ ...s, tenureAdjust: Number(e.target.value) }))
                  }
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>−20y</span><span>+20y</span>
                </div>
              </div>

              {/* Reset */}
              {(simulator.extraPayment > 0 ||
                simulator.rateAdjust !== 0 ||
                simulator.tenureAdjust !== 0) && (
                <button
                  onClick={() => setSimulator({ extraPayment: 0, rateAdjust: 0, tenureAdjust: 0 })}
                  className="text-xs text-muted-foreground hover:text-primary underline transition-colors"
                >
                  Reset simulator
                </button>
              )}

              {/* Comparison Results */}
              {whatIfComparison ? (
                <div className="border-t border-border pt-5 space-y-3">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                    Scenario vs. Base Loan
                  </p>

                  {simulator.extraPayment > 0 && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm text-muted-foreground">New total EMI</span>
                      <span className="text-sm font-bold text-foreground">
                        {formatCurrency(whatIfComparison.scenario.emi + simulator.extraPayment)}/mo
                        <span className="text-xs text-muted-foreground ml-1.5">
                          (base {formatCurrency(whatIfComparison.scenario.emi)} + extra)
                        </span>
                      </span>
                    </div>
                  )}

                  {whatIfComparison.diff.emiChange !== 0 && simulator.extraPayment === 0 && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm text-muted-foreground">EMI change</span>
                      <span
                        className={cn(
                          "text-sm font-bold",
                          whatIfComparison.diff.emiChange < 0 ? "text-emerald-600" : "text-amber-600"
                        )}
                      >
                        {whatIfComparison.diff.emiChange > 0 ? "+" : ""}
                        {formatCurrency(whatIfComparison.diff.emiChange)}/mo
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-muted-foreground">Interest impact</span>
                    <span
                      className={cn(
                        "text-sm font-bold",
                        whatIfComparison.diff.interestSaved > 0 ? "text-emerald-600" : "text-amber-600"
                      )}
                    >
                      {whatIfComparison.diff.interestSaved > 0 ? "−" : "+"}
                      {formatCurrency(Math.abs(whatIfComparison.diff.interestSaved))}
                      {" "}
                      {whatIfComparison.diff.interestSaved > 0 ? "saved" : "more"}
                    </span>
                  </div>

                  {whatIfComparison.diff.monthsSaved !== 0 && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm text-muted-foreground">Loan closes</span>
                      <span
                        className={cn(
                          "text-sm font-bold",
                          whatIfComparison.diff.monthsSaved > 0 ? "text-emerald-600" : "text-amber-600"
                        )}
                      >
                        {whatIfComparison.diff.monthsSaved > 0
                          ? `${fmtMonths(whatIfComparison.diff.monthsSaved)} earlier`
                          : `${fmtMonths(Math.abs(whatIfComparison.diff.monthsSaved))} later`}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Base Total</p>
                      <p className="text-sm font-bold">{formatCurrency(whatIfComparison.base.totalPayment)}</p>
                    </div>
                    <div className="bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Scenario Total</p>
                      <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        {formatCurrency(whatIfComparison.scenario.totalPayment)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-3 border-t border-border pt-5">
                  Adjust the sliders above to explore your savings.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* 3. Pie Chart */}
        {results.p > 0 && (
          <Card className="border-border bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Principal vs. Interest Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center gap-8 pb-8">
              <div className="w-full sm:w-1/2 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%" cy="50%"
                      innerRadius={60} outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: unknown) => formatCurrency(Number(value) || 0)}
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full sm:w-1/2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.principal }} />
                    <span className="text-sm text-muted-foreground">Principal</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(results.p)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.interest }} />
                    <span className="text-sm text-muted-foreground">Interest</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
                </div>
                <div className="pt-3 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Interest is <strong className="text-foreground">{interestPercent}%</strong> of your total repayment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 4. Amortization Schedule */}
        {results.p > 0 && amortizationSchedule.length > 0 && (
          <Card className="border-border bg-background shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Amortization Schedule</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="text-primary hover:text-primary"
                >
                  {showAmortization ? (
                    <>Hide <ChevronUp className="ml-1 h-4 w-4" /></>
                  ) : (
                    <>Show Year-by-Year <ChevronDown className="ml-1 h-4 w-4" /></>
                  )}
                </Button>
              </div>
            </CardHeader>
            {showAmortization && (
              <CardContent className="pb-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 pr-4 font-semibold">Year</th>
                      <th className="text-right py-2 px-4 font-semibold">Opening Balance</th>
                      <th className="text-right py-2 px-4 font-semibold">Principal Paid</th>
                      <th className="text-right py-2 px-4 font-semibold">Interest Paid</th>
                      <th className="text-right py-2 pl-4 font-semibold">Closing Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationSchedule.map((row) => (
                      <tr
                        key={row.year}
                        className="border-b border-border/40 hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-2.5 pr-4 font-medium">Year {row.year}</td>
                        <td className="text-right py-2.5 px-4 text-muted-foreground">
                          {formatCurrency(row.openingBalance)}
                        </td>
                        <td className="text-right py-2.5 px-4 font-medium" style={{ color: CHART_COLORS.principal }}>
                          {formatCurrency(row.principal)}
                        </td>
                        <td className="text-right py-2.5 px-4 font-medium" style={{ color: CHART_COLORS.interest }}>
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="text-right py-2.5 pl-4 text-muted-foreground">
                          {formatCurrency(row.closingBalance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            )}
          </Card>
        )}
      </div>

      {/* ── RIGHT COLUMN (sticky) ── */}
      <div className="lg:col-span-5 flex flex-col space-y-5 lg:sticky lg:top-24">

        {/* 1. Monthly EMI */}
        <Card className="border-none bg-primary text-primary-foreground shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-24 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />
          <CardContent className="p-8 relative z-10 flex flex-col justify-center min-h-[200px]">
            <p className="text-primary-foreground/80 font-medium mb-3 text-sm uppercase tracking-widest">
              Monthly EMI
            </p>
            <h2 className="text-5xl lg:text-6xl font-extrabold tracking-tighter">
              {formatCurrency(results.emi)}
            </h2>
            {results.emi > 0 && (
              <p className="text-primary-foreground/60 text-sm mt-3">
                {formValues.tenure} year{formValues.tenure !== 1 ? "s" : ""} · {(Number(formValues.tenure) || 0) * 12} payments
              </p>
            )}
          </CardContent>
        </Card>

        {/* 2. Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border bg-background">
            <CardContent className="p-5 flex flex-col justify-center">
              <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                Total Interest
              </p>
              <p className="text-xl font-bold tracking-tight" style={{ color: CHART_COLORS.interest }}>
                {formatCurrency(results.totalInterest)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border bg-background">
            <CardContent className="p-5 flex flex-col justify-center">
              <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                Total Payment
              </p>
              <p className="text-xl font-bold tracking-tight text-foreground">
                {formatCurrency(results.totalPayment)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 3. Smart Insights */}
        {insights.length > 0 && (
          <Card className="border-border bg-background shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                Smart Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-5">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className={cn(
                    "rounded-xl p-3.5 border-l-[3px]",
                    insight.type === "positive" &&
                      "border-l-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20",
                    insight.type === "warning" &&
                      "border-l-amber-500 bg-amber-50/60 dark:bg-amber-950/20",
                    insight.type === "neutral" &&
                      "border-l-blue-500 bg-blue-50/60 dark:bg-blue-950/20"
                  )}
                >
                  <p className="text-sm font-semibold text-foreground">{insight.headline}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {insight.detail}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* 4. Share System */}
        {results.emi > 0 && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-full text-sm"
              onClick={handleShareLink}
            >
              {shareStatus === "link" ? (
                <><Check className="mr-1.5 h-4 w-4 text-green-500" /> Link Copied</>
              ) : (
                <><Link2 className="mr-1.5 h-4 w-4" /> Share Link</>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-full text-sm"
              onClick={handleCopyText}
            >
              {shareStatus === "text" ? (
                <><Check className="mr-1.5 h-4 w-4 text-green-500" /> Copied</>
              ) : (
                <><Copy className="mr-1.5 h-4 w-4" /> Copy Summary</>
              )}
            </Button>
          </div>
        )}

        {/* 5. Monetization CTA */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Find the Best Rates</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your ₹{formatInputCurrency(results.p)} requirement, compare current
                  loan offers from SBI, HDFC, ICICI and more.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="w-full rounded-full shadow-md text-sm group">
                Compare Loan Rates{" "}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Link href="/tools/loan-eligibility" className="block">
                <Button variant="outline" className="w-full rounded-full text-sm">
                  Check Your Eligibility →
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
