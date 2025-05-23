"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Toaster } from "@/components/ui/toaster"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)
      try {
        const authenticated = await isLoggedIn()

        // If user is logged in and trying to access auth pages, redirect to home
        if (authenticated && pathname.startsWith("/auth")) {
          router.push("/")
        }

        // Don't redirect from auth pages to login - this creates a loop
        // Only redirect from non-auth pages when not authenticated
        if (!authenticated && !pathname.startsWith("/auth") && pathname !== "/") {
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [isLoggedIn, router, pathname, user])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
