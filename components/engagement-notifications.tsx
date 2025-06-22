"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  TrendingUp, 
  Users, 
  Star, 
  Target,
  X,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "success" | "milestone" | "achievement" | "tip"
  icon: React.ComponentType<any>
  title: string
  message: string
  action?: string
  autoHide?: boolean
}

export function EngagementNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      icon: TrendingUp,
      title: "Registration Spike!",
      message: "🎉 25 new registrations in the last hour!",
      action: "View Analytics",
      autoHide: true
    },
    {
      id: "2",
      type: "milestone",
      icon: Star,
      title: "Achievement Unlocked",
      message: "🏆 You've organized 10 successful events!",
      action: "Claim Badge"
    },
    {
      id: "3",
      type: "tip",
      icon: Target,
      title: "Pro Tip",
      message: "💡 Send reminder emails 24h before your event for 15% better attendance",
      action: "Set Reminder"
    }
  ])

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50/80 backdrop-blur-md"
      case "milestone":
        return "border-yellow-200 bg-yellow-50/80 backdrop-blur-md"
      case "achievement":
        return "border-purple-200 bg-purple-50/80 backdrop-blur-md"
      case "tip":
        return "border-blue-200 bg-blue-50/80 backdrop-blur-md"
      default:
        return "border-border bg-background/80 backdrop-blur-md"
    }
  }

  // Auto-hide notifications after 5 seconds
  useEffect(() => {
    const timers = notifications
      .filter(n => n.autoHide)
      .map(n => 
        setTimeout(() => removeNotification(n.id), 5000)
      )

    return () => timers.forEach(clearTimeout)
  }, [notifications])

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50 max-w-sm">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={cn(
            "transition-all duration-300 animate-in slide-in-from-right",
            getNotificationStyle(notification.type)
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <notification.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {notification.message}
                </p>
                {notification.action && (
                  <Button size="sm" className="text-xs h-7">
                    {notification.action}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}