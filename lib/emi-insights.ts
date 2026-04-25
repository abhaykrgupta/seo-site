/**
 * EMI Insights Engine
 * Pure math functions — deterministic, side-effect-free, fully typed.
 * All interest calculations use monthly-simulation for floating-point accuracy.
 */

// ─── Core EMI Formula ─────────────────────────────────────────────────────

/**
 * Standard reducing-balance EMI.
 * E = P × R × (1+R)^N / [(1+R)^N − 1]
 */
export function calcEmi(
  principal: number,
  annualRate: number,
  tenureYears: number
): number {
  const r = annualRate / 12 / 100
  const n = tenureYears * 12
  if (principal <= 0 || r <= 0 || n <= 0) return 0
  const factor = Math.pow(1 + r, n)
  return (principal * r * factor) / (factor - 1)
}

// ─── Exact Payoff Simulation ──────────────────────────────────────────────

/**
 * Simulates month-by-month payoff.
 * More accurate than logarithmic formula for partial-month edge cases.
 * Returns Infinity when monthly payment cannot cover accrued interest.
 */
export function calcPayoffMonths(
  principal: number,
  annualRate: number,
  monthlyPayment: number
): number {
  const r = annualRate / 12 / 100
  if (r > 0 && monthlyPayment <= principal * r) return Infinity

  let balance = principal
  let months = 0

  while (balance > 0.01 && months < 3600) {
    const interest = balance * r
    const principalPayment = Math.min(monthlyPayment - interest, balance)
    balance = Math.max(0, balance - principalPayment)
    months++
  }

  return months
}

/**
 * Simulates total interest paid over a fixed number of months.
 */
function simulateTotalInterest(
  principal: number,
  annualRate: number,
  emi: number,
  months: number
): number {
  const r = annualRate / 12 / 100
  let balance = principal
  let totalInterest = 0

  for (let m = 0; m < months && balance > 0.01; m++) {
    const interest = balance * r
    totalInterest += interest
    balance = Math.max(0, balance - (emi - interest))
  }

  return totalInterest
}

// ─── Extra Payment Impact ─────────────────────────────────────────────────

export interface ExtraPaymentImpact {
  monthsSaved: number
  interestSaved: number
  newPayoffMonths: number
  newTotalInterest: number
}

/**
 * Exact savings from paying an additional fixed amount per month.
 * Uses full simulation — not an approximation.
 */
export function calcExtraPaymentImpact(
  principal: number,
  annualRate: number,
  baseEmi: number,
  extraPayment: number
): ExtraPaymentImpact {
  const baseMonths = calcPayoffMonths(principal, annualRate, baseEmi)

  if (!isFinite(baseMonths)) {
    return {
      monthsSaved: 0,
      interestSaved: 0,
      newPayoffMonths: Infinity,
      newTotalInterest: Infinity,
    }
  }

  const baseTotalInterest = simulateTotalInterest(principal, annualRate, baseEmi, baseMonths)

  if (extraPayment <= 0) {
    return {
      monthsSaved: 0,
      interestSaved: 0,
      newPayoffMonths: baseMonths,
      newTotalInterest: baseTotalInterest,
    }
  }

  const r = annualRate / 12 / 100
  const totalPayment = baseEmi + extraPayment
  let balance = principal
  let months = 0
  let totalInterestPaid = 0

  while (balance > 0.01 && months < 3600) {
    const interest = balance * r
    const principalPayment = Math.min(totalPayment - interest, balance)
    totalInterestPaid += interest
    balance = Math.max(0, balance - principalPayment)
    months++
  }

  return {
    monthsSaved: Math.max(0, baseMonths - months),
    interestSaved: Math.max(0, baseTotalInterest - totalInterestPaid),
    newPayoffMonths: months,
    newTotalInterest: totalInterestPaid,
  }
}

// ─── What-If Comparison ───────────────────────────────────────────────────

export interface WhatIfParams {
  principal: number
  annualRate: number
  tenureYears: number
  extraPayment: number
}

export interface WhatIfResult {
  base: {
    emi: number
    totalInterest: number
    totalPayment: number
    months: number
  }
  scenario: {
    emi: number
    totalInterest: number
    totalPayment: number
    months: number
  }
  diff: {
    emiChange: number
    interestSaved: number
    monthsSaved: number
  }
}

/**
 * Full comparison between a base loan scenario and a what-if scenario.
 * Handles extra payments, rate changes, and tenure changes simultaneously.
 */
export function calcWhatIfComparison(
  base: WhatIfParams,
  scenario: WhatIfParams
): WhatIfResult {
  // Base scenario (exact simulation)
  const baseEmi = calcEmi(base.principal, base.annualRate, base.tenureYears)
  const baseMonths = base.tenureYears * 12
  const baseTotalInterest = simulateTotalInterest(
    base.principal,
    base.annualRate,
    baseEmi,
    baseMonths
  )

  // Scenario EMI (for the chosen rate + tenure)
  const scenarioEmi = calcEmi(
    scenario.principal,
    scenario.annualRate,
    scenario.tenureYears
  )
  const totalMonthlyPayment = scenarioEmi + scenario.extraPayment

  // Simulate scenario with extra payment applied
  const r = scenario.annualRate / 12 / 100
  let balance = scenario.principal
  let scenarioMonths = 0
  let scenarioTotalInterest = 0

  while (balance > 0.01 && scenarioMonths < 3600) {
    const interest = balance * r
    const principalPayment = Math.min(totalMonthlyPayment - interest, balance)
    scenarioTotalInterest += interest
    balance = Math.max(0, balance - principalPayment)
    scenarioMonths++
  }

  return {
    base: {
      emi: baseEmi,
      totalInterest: baseTotalInterest,
      totalPayment: baseTotalInterest + base.principal,
      months: baseMonths,
    },
    scenario: {
      emi: scenarioEmi,
      totalInterest: scenarioTotalInterest,
      totalPayment: scenarioTotalInterest + scenario.principal,
      months: scenarioMonths,
    },
    diff: {
      emiChange: scenarioEmi - baseEmi,
      interestSaved: baseTotalInterest - scenarioTotalInterest,
      monthsSaved: baseMonths - scenarioMonths,
    },
  }
}

// ─── Smart Insights ───────────────────────────────────────────────────────

export type InsightType = "positive" | "warning" | "neutral"

export interface EmiInsight {
  id: string
  type: InsightType
  headline: string
  detail: string
}

/**
 * Generates up to 3 prioritized, actionable insights for a loan scenario.
 * All insights reference specific numbers — no generic advice.
 */
export function generateEmiInsights(
  principal: number,
  annualRate: number,
  tenureYears: number,
  emi: number,
  totalInterest: number
): EmiInsight[] {
  if (emi <= 0 || principal <= 0) return []

  const insights: EmiInsight[] = []
  const interestRatio = totalInterest / principal
  const perDollarCost = (1 + interestRatio).toFixed(2)

  // Insight 1: Interest burden with concrete per-rupee framing
  insights.push({
    id: "interest-burden",
    type: interestRatio > 0.8 ? "warning" : "neutral",
    headline: `You pay ${fmtCurrency(totalInterest)} in interest`,
    detail:
      interestRatio > 1
        ? `For every ₹1 you borrow, you repay ₹${perDollarCost}. A shorter tenure or larger down payment significantly reduces this.`
        : `For every ₹1 borrowed, you repay ₹${perDollarCost} total — ${Math.round(interestRatio * 100)}% goes to interest over ${tenureYears} years.`,
  })

  // Insight 2: Extra ₹2,000/month impact (only shown if meaningful)
  const extra2000 = calcExtraPaymentImpact(principal, annualRate, emi, 2000)
  if (extra2000.monthsSaved >= 6 && extra2000.interestSaved > 5000) {
    insights.push({
      id: "extra-2000",
      type: "positive",
      headline: `Pay ₹2,000 more/mo → save ${fmtCurrency(extra2000.interestSaved)}`,
      detail: `An extra ₹2,000 per month closes your loan ${fmtMonths(extra2000.monthsSaved)} early and saves ${fmtCurrency(extra2000.interestSaved)} in total interest.`,
    })
  }

  // Insight 3: Rate sensitivity — 1% lower rate
  if (annualRate > 1.1) {
    const lowerRate = annualRate - 1
    const lowerRateEmi = calcEmi(principal, lowerRate, tenureYears)
    const lowerRateInterest = simulateTotalInterest(
      principal,
      lowerRate,
      lowerRateEmi,
      tenureYears * 12
    )
    const rateSaving = totalInterest - lowerRateInterest

    if (rateSaving > 5000) {
      insights.push({
        id: "rate-sensitivity",
        type: "neutral",
        headline: `1% lower rate saves ${fmtCurrency(rateSaving)}`,
        detail: `At ${lowerRate.toFixed(1)}% instead of ${annualRate}%, your EMI drops to ${fmtCurrency(lowerRateEmi)}/mo and you save ${fmtCurrency(rateSaving)} over the loan life.`,
      })
    }
  }

  return insights.slice(0, 3)
}

// ─── Formatting Helpers ───────────────────────────────────────────────────

export function fmtCurrency(val: number): string {
  if (!isFinite(val)) return "N/A"
  if (val >= 1_00_00_000) return `₹${(val / 1_00_00_000).toFixed(2)}Cr`
  if (val >= 1_00_000) return `₹${(val / 1_00_000).toFixed(1)}L`
  if (val >= 1_000) return `₹${Math.round(val / 1_000)}k`
  return `₹${Math.round(val)}`
}

export function fmtMonths(months: number): string {
  if (!isFinite(months) || months <= 0) return "0 months"
  const years = Math.floor(months / 12)
  const rem = months % 12
  if (years === 0) return `${months} month${months !== 1 ? "s" : ""}`
  if (rem === 0) return `${years} year${years !== 1 ? "s" : ""}`
  return `${years}y ${rem}mo`
}
