"use client"

import { useState } from "react"
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.message || "Something went wrong")

      setStatus("success")
      setMessage(data.message)
      setEmail("")
    } catch (err: any) {
      setStatus("error")
      setMessage(err.message)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl dark:bg-neutral-900/10">
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="h-6 w-6" />
        </div>
        
        <h2 className="mb-2 text-2xl font-bold tracking-tight">Get Weekly Finance Tips</h2>
        <p className="mb-8 max-w-md text-muted-foreground">
          Every Sunday — budgeting hacks, investing guides, and money-saving tools delivered to your inbox.
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-10 w-10" />
            <p className="font-medium">{message}</p>
            <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
              Subscribe another email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 flex-1 rounded-xl border border-border bg-background px-4 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
              />
              <Button type="submit" className="h-11 px-6 font-semibold" disabled={status === "loading"}>
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe Free"
                )}
              </Button>
            </div>
            
            {status === "error" && (
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-destructive font-medium">
                <AlertCircle className="h-4 w-4" />
                <span>{message}</span>
              </div>
            )}
            
            <p className="mt-4 text-xs text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>

      {/* Background accents */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl" />
    </div>
  )
}
