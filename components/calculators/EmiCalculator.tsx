"use client"

import React, { useMemo } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ArrowRight, Landmark } from "lucide-react"

const schema = z.object({
  amount: z.number({ message: "Must be a valid number" }).min(1000).max(50000000),
  rate: z.number({ message: "Must be a valid number" }).min(0.1).max(50),
  tenure: z.number({ message: "Must be a valid number" }).min(1).max(50),
})

type EmiFormValues = z.infer<typeof schema>

export function EmiCalculator() {
  const { control, watch } = useForm<EmiFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 250000,
      rate: 6.5,
      tenure: 15,
    },
    mode: "onChange",
  })

  const formValues = watch()

  // Custom Currency Formatter for Inputs (e.g. 250,000 instead of 250000)
  const formatInputCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US').format(val)
  }

  const results = useMemo(() => {
    const p = Number(formValues.amount) || 0;
    const r = (Number(formValues.rate) || 0) / 12 / 100;
    const n = (Number(formValues.tenure) || 0) * 12;

    if (p <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0, p: 0 }
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
      emi: isNaN(emi) ? 0 : emi,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      p: p,
    }
  }, [formValues])

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)

  const chartData = [
    { name: "Principal Amount", value: results.p, color: "#0f172a" }, // slate-900
    { name: "Total Interest", value: results.totalInterest, color: "#94a3b8" }, // slate-400
  ]

  // A tiny custom slider component to keep code clean
  const RangeSlider = ({ value, min, max, step, onChange }: any) => (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value || 0}
      onChange={onChange}
      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary mt-4"
    />
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full mt-8 items-start relative">
      
      {/* Left: Input Form */}
      <div className="lg:col-span-7 space-y-8">
        <Card className="border-border bg-background shadow-sm">
          <CardContent className="p-6 md:p-8 space-y-8">
            <h3 className="heading-3 text-2xl mb-2">Configure Loan Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-foreground">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-col">
                        <Input 
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                          className="h-10 text-lg w-32 pl-8 font-semibold text-right"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <RangeSlider min="1000" max="1000000" step="1000" value={field.value} onChange={(e: any) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-foreground">Interest Rate (% p.a.)</label>
                <div className="relative">
                  <Controller
                    name="rate"
                    control={control}
                    render={({ field }) => (
                      <Input 
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                        className="h-10 text-lg w-28 pr-8 font-semibold text-right"
                      />
                    )}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
              </div>
              <Controller
                name="rate"
                control={control}
                render={({ field }) => (
                  <RangeSlider min="0.1" max="25" step="0.1" value={field.value} onChange={(e: any) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-foreground">Loan Tenure</label>
                <div className="relative">
                  <Controller
                    name="tenure"
                    control={control}
                    render={({ field }) => (
                      <Input 
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                        className="h-10 text-lg w-28 pr-12 font-semibold text-right"
                      />
                    )}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">Yrs</span>
                </div>
              </div>
              <Controller
                name="tenure"
                control={control}
                render={({ field }) => (
                  <RangeSlider min="1" max="30" step="1" value={field.value} onChange={(e: any) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>

          </CardContent>
        </Card>

        {/* Chart Visualization inside Left Column for clean flow */}
        {results.p > 0 && (
          <Card className="border-border bg-background shadow-sm">
             <CardHeader>
               <CardTitle className="text-lg">Breakdown</CardTitle>
             </CardHeader>
             <CardContent className="flex flex-col sm:flex-row items-center gap-8 pb-8">
                <div className="w-full sm:w-1/2 h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => formatCurrency(Number(value) || 0)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className="w-3 h-3 rounded-full bg-slate-900"></span>
                       <span className="text-sm text-muted-foreground">Principal</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(results.p)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                       <span className="text-sm text-muted-foreground">Interest</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
                  </div>
                </div>
             </CardContent>
          </Card>
        )}
      </div>

      {/* Right: Sticky Results Panel & Monetization CTA */}
      <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">
        <Card className="border-none bg-primary text-primary-foreground shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-24 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />
          <CardContent className="p-8 relative z-10 flex flex-col justify-center min-h-[220px]">
            <p className="text-primary-foreground/80 font-medium mb-3 text-sm uppercase tracking-widest">Monthly EMI</p>
            <h2 className="text-5xl lg:text-6xl font-extrabold tracking-tighter">
              {formatCurrency(results.emi)}
            </h2>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border bg-background">
            <CardContent className="p-5 h-full flex flex-col justify-center">
              <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Total Interest</p>
              <p className="text-xl font-bold text-foreground tracking-tight">
                {formatCurrency(results.totalInterest)}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-background">
            <CardContent className="p-5 h-full flex flex-col justify-center">
              <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Total Payment</p>
              <p className="text-xl font-bold text-foreground tracking-tight">
                {formatCurrency(results.totalPayment)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Monetization / CTA Block */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
               <div className="bg-primary/10 p-2 rounded-lg text-primary">
                 <Landmark className="w-5 h-5" />
               </div>
               <div>
                  <h4 className="font-semibold text-foreground">Find the Best Rates</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your ${formatInputCurrency(results.p)} requirement, you may qualify for specialized low-interest loan offers.
                  </p>
               </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-3">
               <Button className="w-full rounded-full shadow-md text-sm group">
                 Apply for Loan <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
               </Button>
               <Button variant="outline" className="w-full rounded-full text-sm">
                 Compare Loan Offers
               </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
