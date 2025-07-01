"use client"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
// ...existing imports...

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isManageOpen, setIsManageOpen] = useState(false)
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [showAIInsight, setShowAIInsight] = useState(true)

  // Add functional handlers
  const handleCreateEvent = () => {
    toast({
      title: "Creating New Event",
      description: "Opening event creation wizard...",
    })
    router.push('/create-event')
  }

  const handleSmartClone = () => {
    toast({
      title: "Smart Clone",
      description: "Select an event to clone with AI enhancements",
    })
    router.push('/clone-event')
  }

  const handleAIApply = () => {
    toast({
      title: "AI Suggestion Applied",
      description: "Saturday 2PM time slot has been set as default for new events",
    })
    setShowAIInsight(false)
  }

  const handleSignOut = () => {
    toast({
      title: "Signing Out",
      description: "You have been successfully logged out",
    })
    // Simulate sign out
    setTimeout(() => {
      router.push('/auth/login')
    }, 1000)
  }

  // ...rest of existing code with these additions to buttons...

  // In the AI Insight section, replace the button:
  <Button 
    size="sm" 
    variant="ghost" 
    className="text-xs h-6 px-2 text-primary hover:bg-primary/10"
    onClick={handleAIApply}
  >
    Apply Now
  </Button>

  // In the primary actions section:
  {primaryActions.map((item) => (
    <SidebarMenuButton 
      key={item.label}
      asChild
      className={cn(/* existing classes */)}
      onClick={item.label === "Create Event" ? handleCreateEvent : handleSmartClone}
    >
      {/* existing content */}
    </SidebarMenuButton>
  ))}

  // In the sign out button:
  <SidebarMenuButton 
    className={cn(/* existing classes */)}
    onClick={handleSignOut}
  >
    {/* existing content */}
  </SidebarMenuButton>
}