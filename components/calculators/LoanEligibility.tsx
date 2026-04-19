"use client"

import React, { useMemo } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, AreaChart, Area } from "recharts"
import { ArrowRight, Wallet, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

const schema = z.object({
  income: z.union([z.coerce.number(), z.string()]).optional(),
  obligations: z.union([z.coerce.number(), z.string()]).optional(),
  tenure: z.union([z.coerce.number(), z.string()]).optional(),
  rate: z.union([z.coerce.number(), z.string()]).optional(),
})

type FormValues = z.infer<typeof schema>

export function LoanEligibility() {
  const [isSearching, setIsSearching] = React.useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 1500)
  }

  const { control, watch } = useForm<FormValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      income: 8000,
      obligations: 1200,
      tenure: 20,
      rate: 7.5,
    },
    mode: "onChange",
  })

  const formValues = watch()

  const eligibility = useMemo(() => {
    const monthlyIncome = Number(formValues.income) || 0
    const existingEmi = Number(formValues.obligations) || 0
    const tenureYrs = Number(formValues.tenure) || 0
    const interestRate = Number(formValues.rate) || 0

    if (monthlyIncome <= 0 || tenureYrs <= 0 || interestRate <= 0) {
      return { maxLoan: 0, maxEmi: 0, status: 'Invalid' }
    }

    // FOIR Rule (Fixed Obligation to Income Ratio) - Standard is 50%
    const maxTotalObligation = monthlyIncome * 0.50
    const availableEmi = Math.max(0, maxTotalObligation - existingEmi)

    // Reverse EMI formula to find Principal: P = (E * ( (1+r)^n - 1 )) / ( r * (1+r)^n )
    const r = interestRate / 12 / 100
    const n = tenureYrs * 12
    
    let maxLoanAmount = (availableEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))

    return {
      maxLoan: isNaN(maxLoanAmount) ? 0 : Math.round(maxLoanAmount),
      maxEmi: Math.round(availableEmi),
      foir: ((existingEmi + availableEmi) / monthlyIncome) * 100,
      status: availableEmi > 0 ? 'Eligible' : 'Ineligible'
    }
  }, [formValues])

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)

  const chartData = [
    { name: "Monthly Income", value: Number(formValues.income) || 0, fill: "#e2e8f0" },
    { name: "Existing Loans", value: Number(formValues.obligations) || 0, fill: "#ef4444" },
    { name: "Available for New EMI", value: eligibility.maxEmi, fill: "#3b82f6" },
  ]

  const RangeSlider = ({ value, min, max, step, onChange }: any) => (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value || 0}
      onChange={onChange}
      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary mt-4"
    />
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full mt-8 items-start relative">
      
      {/* Inputs */}
      <div className="lg:col-span-7 space-y-8">
        <Card className="border-border/60 bg-background/50 backdrop-blur-sm shadow-sm ring-1 ring-black/5 dark:ring-white/5">
          <CardContent className="p-6 md:p-8 space-y-8">
             <div className="flex items-center gap-3 mb-2">
               <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                 <Wallet className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-bold tracking-tight text-foreground">Financial Profile</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label>Net Monthly Income</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Controller
                    name="income"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" {...field} value={field.value === 0 ? '' : field.value ?? ''} className="h-10 text-lg w-32 pl-8 text-right font-bold" />
                    )}
                  />
                </div>
              </div>
              <Controller
                name="income"
                control={control}
                render={({ field }) => (
                  <RangeSlider min="1000" max="50000" step="500" value={field.value} onChange={(e: any) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label>Existing Monthly EMIs</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Controller
                    name="obligations"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" {...field} value={field.value === 0 ? '' : field.value ?? ''} className="h-10 text-lg w-32 pl-8 text-right font-bold" />
                    )}
                  />
                </div>
              </div>
              <Controller
                name="obligations"
                control={control}
                render={({ field }) => (
                  <RangeSlider min="0" max="25000" step="100" value={field.value} onChange={(e: any) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <label className="text-sm font-semibold">Tenure (Years)</label>
                  <Controller
                    name="tenure"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" {...field} value={field.value === 0 ? '' : field.value ?? ''} className="h-10 text-lg w-full font-bold" />
                    )}
                  />
                  <Controller
                    name="tenure"
                    control={control}
                    render={({ field }) => (
                      <RangeSlider min="1" max="30" step="1" value={field.value} onChange={(e: any) => field.onChange(Number(e.target.value))} />
                    )}
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-sm font-semibold">Interest Rate (% p.a.)</label>
                  <Controller
                    name="rate"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" step="0.1" {...field} value={field.value === 0 ? '' : field.value ?? ''} className="h-10 text-lg w-full font-bold" />
                    )}
                  />
                  <Controller
                    name="rate"
                    control={control}
                    render={({ field }) => (
                      <RangeSlider min="5" max="20" step="0.1" value={field.value} onChange={(e: any) => field.onChange(Number(e.target.value))} />
                    )}
                  />
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Visual Eligibility Bar */}
        <Card className="border-border/60 bg-background/50 backdrop-blur-sm overflow-hidden">
           <CardHeader className="bg-muted/20 pb-4">
              <CardTitle className="text-lg">Monthly Income Allocation</CardTitle>
           </CardHeader>
           <CardContent className="h-[280px] pt-8">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30 }}>
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fontWeight: 600 }} />
                 <Tooltip formatter={(v) => formatCurrency(Number(v))} cursor={{ fill: 'transparent' }} />
                 <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </CardContent>
        </Card>
      </div>

      {/* Outcome Sticky Card */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
        <Card className="border-none bg-primary text-primary-foreground shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-white/15 transition-all duration-700" />
          <CardContent className="p-8 relative z-10 flex flex-col justify-center min-h-[320px]">
             {eligibility.maxLoan > 0 ? (
               <div className="space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-widest text-white ring-1 ring-white/30 truncate">
                   <CheckCircle2 className="w-3.5 h-3.5 text-green-300" /> Loan Ready
                 </div>
                 <p className="text-primary-foreground/70 font-medium uppercase tracking-[0.2em] text-xs">Estimated Eligibility</p>
                 <h2 className="text-6xl lg:text-7xl font-black tracking-tighter text-white">
                   {formatCurrency(eligibility.maxLoan)}
                 </h2>
                 <div className="pt-4 border-t border-white/20">
                    <p className="text-sm font-semibold opacity-90">Max Monthly EMI: {formatCurrency(eligibility.maxEmi)}</p>
                    <p className="text-xs opacity-70 mt-1">Based on a 50% Debt-to-Income ratio (FOIR).</p>
                 </div>
               </div>
             ) : (
               <div className="space-y-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/30 text-xs font-bold uppercase tracking-widest text-white ring-1 ring-white/30 truncate">
                   <AlertCircle className="w-3.5 h-3.5 text-red-100" /> High Debt Warning
                 </div>
                 <h2 className="text-3xl font-black text-white">Ineligible for New Loans</h2>
                 <p className="text-base text-primary-foreground/80 font-medium leading-relaxed">
                    Your current EMIs spend over 50% of your income. Banks typically consider this a high-risk scenario. Reduce your current debt to increase eligibility.
                 </p>
               </div>
             )}
          </CardContent>
        </Card>

        {/* Action Strategy */}
        <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10">
           <CardContent className="p-6">
              <h4 className="font-bold text-lg mb-2">How to increase your borrowing power?</h4>
              <ul className="space-y-3">
                 <li className="flex items-start gap-2.5 text-sm text-muted-foreground leading-snug">
                   <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                   Clear high-interest credit card debt first to release FOIR bandwidth.
                 </li>
                 <li className="flex items-start gap-2.5 text-sm text-muted-foreground leading-snug">
                   <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                   Add a co-applicant to pool incomes and double your eligibility.
                 </li>
                 <li className="flex items-start gap-2.5 text-sm text-muted-foreground leading-snug">
                   <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                   Opt for a longer tenure to reduce EMI and qualify for higher amounts.
                 </li>
              </ul>
              <Button 
                 className="w-full mt-8 rounded-2xl font-bold sky shadow-xl group transition-all"
                 disabled={isSearching}
                 onClick={handleSearch}
              >
                 {isSearching ? (
                   <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Verifying Eligibility...</>
                 ) : (
                   <>Apply with Partner Banks <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /></>
                 )}
              </Button>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
