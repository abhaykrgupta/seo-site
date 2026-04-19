"use client"

import React, { useMemo } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ArrowRight, CreditCard, TrendingDown, Loader2 } from "lucide-react"

const schema = z.object({
  balance: z.union([z.coerce.number(), z.string()]).optional(),
  rate: z.union([z.coerce.number(), z.string()]).optional(),
  payment: z.union([z.coerce.number(), z.string()]).optional(),
})

type FormValues = z.infer<typeof schema>

export function CreditCardOptimizer() {
  const [isSearching, setIsSearching] = React.useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 1500)
  }

  const { control, watch } = useForm<FormValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      balance: 5000,
      rate: 18.9,
      payment: 250,
    },
    mode: "onChange",
  })

  const formValues = watch()

  const results = useMemo(() => {
    const balance = Number(formValues.balance) || 0
    const annualRate = Number(formValues.rate) || 0
    const monthlyPayment = Number(formValues.payment) || 0
    const monthlyRate = annualRate / 12 / 100

    if (balance <= 0 || annualRate <= 0 || monthlyPayment <= 0) {
      return { months: 0, totalInterest: 0, totalPayment: 0, interestRatio: 0 }
    }

    // Check if payment covers interest
    if (monthlyPayment <= balance * monthlyRate) {
      return { 
        months: Infinity, 
        totalInterest: balance * 2, // Dummy high for logic
        totalPayment: balance * 3, 
        interestRatio: 0,
        error: "Monthly payment is too low to cover interest." 
      }
    }

    // Calculation: log(P*m / (P*m - i*B)) / log(1 + m)
    const months = Math.log(monthlyPayment / (monthlyPayment - monthlyRate * balance)) / Math.log(1 + monthlyRate)
    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - balance

    return {
      months: Math.ceil(months),
      totalInterest: Math.max(0, totalInterest),
      totalPayment: totalPayment,
      interestRatio: (totalInterest / totalPayment) * 100
    }
  }, [formValues])

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)

  const chartData = [
    { name: "Original Debt", value: Number(formValues.balance) || 0, color: "#10b981" }, // emerald-500
    { name: "Interest Cost", value: results.totalInterest, color: "#ef4444" }, // red-500
  ]

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
      
      {/* Left Column: Inputs */}
      <div className="lg:col-span-7 space-y-8">
        <Card className="border-border/60 bg-background/50 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-primary/10 rounded-lg text-primary">
                 <CreditCard className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-bold tracking-tight">Debt Parameters</h3>
            </div>
            
            {/* Balance Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-foreground">Current Balance</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Controller
                    name="balance"
                    control={control}
                    render={({ field }) => (
                      <Input 
                        type="number"
                        step="100"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value || ''}
                        className="h-10 text-lg w-32 pl-8 font-semibold text-right"
                      />
                    )}
                  />
                </div>
              </div>
              <Controller
                name="balance"
                control={control}
                render={({ field }) => (
                  <RangeSlider min="500" max="50000" step="100" value={field.value} onChange={(e: any) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>

            {/* Interest Rate Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-foreground">Annual Interest (APR)</label>
                <div className="relative">
                  <Controller
                    name="rate"
                    control={control}
                    render={({ field }) => (
                      <Input 
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value || ''}
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
                  <RangeSlider min="5" max="36" step="0.1" value={field.value} onChange={(e: any) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>

            {/* Monthly Payment Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-foreground">Planned Monthly Payment</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Controller
                    name="payment"
                    control={control}
                    render={({ field }) => (
                      <Input 
                        type="number"
                        step="10"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value || ''}
                        className="h-10 text-lg w-28 pl-8 font-semibold text-right"
                      />
                    )}
                  />
                </div>
              </div>
              <Controller
                name="payment"
                control={control}
                render={({ field }) => (
                  <RangeSlider min="50" max="5000" step="10" value={field.value} onChange={(e: any) => field.onChange(Number(e.target.value))} />
                )}
              />
            </div>

          </CardContent>
        </Card>

        {/* Breakdown Visualization */}
        {results.months > 0 && results.months !== Infinity && (
          <Card className="border-border/60 bg-background/50 backdrop-blur-sm shadow-sm overflow-hidden">
             <CardHeader className="border-b border-border/40 bg-muted/20">
               <CardTitle className="text-lg">Debt vs. Interest Breakdown</CardTitle>
             </CardHeader>
             <CardContent className="flex flex-col sm:flex-row items-center gap-8 py-8 px-6">
                <div className="w-full sm:w-1/2 h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                        animationDuration={1000}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => formatCurrency(Number(value) || 0)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 space-y-6">
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                     <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Principal</span>
                     <span className="font-bold">{formatCurrency(Number(formValues.balance) || 0)}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
                     <span className="text-sm font-medium text-red-600 dark:text-red-400">Total Interest</span>
                     <span className="font-bold">{formatCurrency(results.totalInterest)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center italic">
                    You will spend <strong>{Math.round(results.interestRatio)}%</strong> of your total payments on interest alone.
                  </p>
                </div>
             </CardContent>
          </Card>
        )}
      </div>

      {/* Right Column: Outcomes */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
        
        {/* Dynamic Results Card */}
        <Card className="border-none bg-primary text-primary-foreground shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-white/15 transition-colors duration-500" />
          <CardContent className="p-8 relative z-10 flex flex-col justify-center min-h-[250px]">
             {results.months === Infinity ? (
               <div className="space-y-4">
                 <p className="text-primary-foreground/70 font-medium uppercase tracking-[0.2em] text-xs">Alert</p>
                 <h2 className="text-3xl font-black text-white leading-tight">Payment Too Low</h2>
                 <p className="text-sm text-primary-foreground/80 leading-relaxed font-medium">
                   Your payment doesn't even cover the interest. Your debt will grow forever. Increase your payment to at least {formatCurrency((Number(formValues.balance) * (Number(formValues.rate)/100)/12) + 10)}.
                 </p>
               </div>
             ) : (
               <div className="space-y-2">
                 <p className="text-primary-foreground/70 font-medium uppercase tracking-[0.2em] text-xs">Time to Freedom</p>
                 <h2 className="text-6xl lg:text-7xl font-black tracking-tighter text-white">
                   {results.months} <span className="text-3xl opacity-60">Months</span>
                 </h2>
                 <p className="text-sm text-primary-foreground/80 font-medium pt-4">
                    Debt-free by {new Date(new Date().setMonth(new Date().getMonth() + results.months)).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
                 </p>
               </div>
             )}
          </CardContent>
        </Card>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 gap-4">
           <Card className="border-border bg-background/50 backdrop-blur-sm">
             <CardContent className="p-5">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Paid</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(results.totalPayment)}</p>
             </CardContent>
           </Card>
           <Card className="border-border bg-background/50 backdrop-blur-sm">
             <CardContent className="p-5">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Interest</p>
                <p className="text-xl font-bold text-red-500">{formatCurrency(results.totalInterest)}</p>
             </CardContent>
           </Card>
        </div>

        {/* Action Strategy Block */}
        <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10 overflow-hidden">
           <CardContent className="p-6 relative">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                   <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-bold text-foreground">Save {formatCurrency(results.totalInterest * 0.4)} with a Balance Transfer</h4>
                   <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Based on your {formValues.rate}% APR, you could save significantly by transferring to a 0% APR card for 18 months.
                   </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                 <Button 
                    className="w-full rounded-2xl shadow-md font-bold group transition-all"
                    disabled={isSearching}
                    onClick={handleSearch}
                 >
                    {isSearching ? (
                      <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Searching Partners...</>
                    ) : (
                      <>Find Optimizer Cards <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /></>
                    )}
                 </Button>
                 <Button variant="outline" className="w-full rounded-2xl font-bold">
                    Talk to a Debt Expert
                 </Button>
              </div>
           </CardContent>
        </Card>

      </div>
    </div>
  )
}
