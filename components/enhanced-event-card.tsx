"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Settings, 
  Star, 
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Copy,
  Share2
} from "lucide-react"

interface EventCardProps {
  event: {
    id: string
    title: string
    date: string
    time: string
    attendees: number
    revenue: number
    checkinRate: number
    rating: number
    status: "live" | "upcoming" | "completed"
  }
}

export function EnhancedEventCard({ event }: EventCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-green-500"
      case "upcoming": return "bg-blue-500"
      case "completed": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "live": return "Live"
      case "upcoming": return "Upcoming"
      case "completed": return "Completed"
      default: return "Unknown"
    }
  }

  return (
    <Card className="group hover:shadow-eventpass-lg transition-all duration-200 overflow-hidden">
      <div className="relative">
        <div className="absolute top-3 right-3 z-10">
          <Badge className={cn("text-white", getStatusColor(event.status))}>
            {getStatusText(event.status)}
          </Badge>
        </div>
        <div className="absolute top-3 left-3 z-10">
          {event.status === "live" && (
            <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-sm rounded-full px-2 py-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-700 font-medium">Live</span>
            </div>
          )}
        </div>
        <div className="h-48 bg-gradient-to-r from-primary/20 to-event-secondary/20 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-bold text-xl mb-2">{event.title}</h3>
            <p className="text-muted-foreground">{event.date} • {event.time}</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="h-4 w-4 text-green-600 mr-1" />
              <div className="font-semibold text-sm">€{event.revenue}</div>
            </div>
            <div className="text-xs text-muted-foreground">Revenue</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="h-4 w-4 text-blue-600 mr-1" />
              <div className="font-semibold text-sm">{event.checkinRate}%</div>
            </div>
            <div className="text-xs text-muted-foreground">Check-in</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
              <div className="font-semibold text-sm">{event.rating}</div>
            </div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
        </div>

        {/* Attendee Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-primary/5 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">{event.attendees} attending</span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="h-3 w-3" />
            <span className="text-xs font-medium">+12% vs last event</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Button size="sm" className="flex-1">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Settings className="h-4 w-4 mr-2" />
            Manage
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="flex-1 text-xs">
            <Copy className="h-3 w-3 mr-1" />
            Clone
          </Button>
          <Button size="sm" variant="ghost" className="flex-1 text-xs">
            <Share2 className="h-3 w-3 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}