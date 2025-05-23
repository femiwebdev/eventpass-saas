import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - EventPass",
  description: "Sign in or create an account for EventPass",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
