import Link from "next/link"
import { ShieldCheck, Calendar, UserCircle } from "lucide-react"

interface AuthorBioProps {
  authorName?: string
  lastUpdated?: string
}

export function AuthorBio({ 
  authorName = "FinVault Editorial Team", 
  lastUpdated 
}: AuthorBioProps) {
  return (
    <div className="mt-16 overflow-hidden rounded-2xl border border-border/60 bg-background/50 backdrop-blur-xl shadow-sm ring-1 ring-black/5 dark:ring-white/10">
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
            <UserCircle className="w-10 h-10" />
          </div>
        </div>

        {/* Bio Content */}
        <div className="flex-1 space-y-3">
          <div>
            <h4 className="text-xl font-bold text-foreground tracking-tight">{authorName}</h4>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mt-1">
              Financial Educator
            </p>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed">
            Dedicated to breaking down complex financial concepts into actionable insights. Our mission is to empower you with mathematically accurate tools and strategies to take control of your wealth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-4 border-t border-border/50 text-sm">
            {lastUpdated && (
              <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <Calendar className="w-4 h-4 opacity-70" />
                <span>Updated on {lastUpdated}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold sm:ml-auto">
              <ShieldCheck className="w-4 h-4" />
              <span>Fact-checked for accuracy.</span>
              <Link href="/disclaimer" className="underline underline-offset-4 opacity-80 hover:opacity-100 ml-1">
                Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
