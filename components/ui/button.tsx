import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    // Base styles with smooth transitions, 2xl rounding, and active scaling
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] hover:scale-[1.02]"
    
    // Variant styles matching premium fintech SaaS look
    const variants = {
      primary: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg",
      secondary: "bg-muted text-foreground shadow-sm hover:bg-muted/80",
      outline: "border border-border bg-background shadow-sm hover:bg-muted hover:text-foreground",
      ghost: "hover:bg-muted hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    }
    
    // Size styles
    const sizes = {
      default: "h-10 px-6 py-2",
      sm: "h-9 px-4",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
