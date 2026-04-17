import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, container = true, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("py-16 md:py-24 lg:py-32", className)}
        {...props}
      >
        {container ? (
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    )
  }
)
Section.displayName = "Section"
