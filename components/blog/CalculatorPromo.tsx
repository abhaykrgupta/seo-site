import Link from "next/link"
import { Calculator, ArrowRight, ShieldCheck } from "lucide-react"

export function CalculatorPromo() {
  return (
    <div className="my-10 w-full max-w-2xl mx-auto overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-xl shadow-lg ring-1 ring-primary/10 transition-all hover:bg-primary/10">
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        
        {/* Left Icon Area */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-inner">
            <Calculator className="w-8 h-8" />
          </div>
        </div>

        {/* Text Details Area */}
        <div className="flex-1 space-y-1.5">
          <h4 className="text-xl font-bold text-foreground flex items-center justify-center md:justify-start gap-2 m-0">
            <span className="text-xl">💡</span> Want to calculate your own numbers?
          </h4>
          <p className="text-base text-muted-foreground m-0">
            Try our free, instant EMI Calculator to visualize your exact amortization schedule.
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-1.5 pt-1 text-xs text-muted-foreground/80 font-medium pb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Free tool • No signup required</span>
          </div>
        </div>

        {/* CTA Button Area */}
        <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
          <Link
            href="/tools/emi?source=blog"
            className="group relative inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all active:scale-95 hover:shadow-lg"
          >
            {/* Glowing Pulse Aura */}
            <span className="absolute inset-0 rounded-full bg-primary opacity-40 blur-md group-hover:animate-pulse transition-all duration-500" />
            
            {/* Real Button Container */}
            <span className="relative flex items-center justify-center gap-2">
              Calculate Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

      </div>
    </div>
  )
}
