"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
// import { useTranslation } from "@/hooks/use-translation"

// Temporary fix until i18n is properly set up
const useTranslation = () => {
  return {
    t: (key: string) => {
      const translations: Record<string, string> = {
        "auth.email": "Email",
        "auth.resetPassword": "Reset Password",
      }
      return translations[key] || key
    },
  }
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Reset email sent",
        description: `A password reset link has been sent to ${email}.`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">{t("auth.email")}</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>
      <Button disabled={loading} type="submit" className="w-full">
        {loading ? "Sending Reset Link..." : t("auth.resetPassword")}
      </Button>
    </form>
  )
}
