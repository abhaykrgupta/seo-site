"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MessageSquare, User, CheckCircle2, AlertCircle } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  // Provide your real Formspree endpoint below
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID_HERE"

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section className="pt-8 pb-16 lg:pt-12">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="heading-1 !text-4xl lg:!text-5xl">Contact Us</h1>
          <p className="body-text text-lg max-w-xl mx-auto">
            Have a question about our calculators, a feature request, or partnership inquiry? Drop us a line below.
          </p>
        </div>

        <Card className="border-border bg-background shadow-md backdrop-blur-xl">
          <CardHeader className="text-center border-b border-border/50 pb-6">
            <CardTitle className="text-2xl font-bold">Send a Message</CardTitle>
            <CardDescription className="text-base">We aim to respond to all inquiries within 24-48 hours.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
                <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. We will get back to you shortly.</p>
                <Button variant="outline" onClick={() => setSubmitStatus("idle")} className="mt-4">
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" /> Name
                    </label>
                    <Input placeholder="John Doe" {...register("name")} className="bg-muted/30" />
                    {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" /> Email Address
                    </label>
                    <Input type="email" placeholder="john@example.com" {...register("email")} className="bg-muted/30" />
                    {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Subject</label>
                  <Input placeholder="Feature Request: Investment Calculator" {...register("subject")} className="bg-muted/30" />
                  {errors.subject && <p className="text-xs text-red-500 font-medium">{errors.subject.message}</p>}
                </div>

                {/* Message Textarea (custom styled for consistency) */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" /> Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="How can we help you today?"
                    {...register("message")}
                    className="flex w-full rounded-xl border border-input bg-muted/30 px-3 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  ></textarea>
                  {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message.message}</p>}
                </div>

                {/* Optional: Error State block from formspree side */}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">Something went wrong sending your message. Please try again.</p>
                  </div>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl h-12 text-base font-semibold shadow-md active:scale-[0.98] transition-transform">
                  {isSubmitting ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
