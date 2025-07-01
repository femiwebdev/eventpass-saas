"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAppState, appActions } from "@/lib/store"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  BarChart3, 
  Settings, 
  Star, 
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Copy,
  Share2,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Clock
} from "lucide-react"

interface EventCardProps {
  event: {
    id: string
    title: string
    description?: string
    date: string
    time: string
    location?: string
    attendees: number
    revenue: number
    checkinRate: number
    rating: number
    status: "live" | "upcoming" | "completed"
  }
}

export function EnhancedEventCard({ event }: EventCardProps) {
  const [isCloning, setIsCloning] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { dispatch } = useAppState()
  const { toast } = useToast()
  const router = useRouter()

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

  const handleAnalytics = () => {
    toast({
      title: "Opening Analytics",
      description: `Loading detailed analytics for ${event.title}`,
    })
    router.push(`/analytics`)
  }

  const handleManage = () => {
    toast({
      title: "Opening Event Manager",
      description: `Managing ${event.title}`,
    })
    router.push(`/check-in`)
  }

  const handleEdit = () => {
    toast({
      title: "Edit Feature",
      description: "Edit functionality coming soon!",
    })
  }

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${event.title}"? This action cannot be undone.`)) {
      return
    }

    setIsDeleting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    dispatch(appActions.deleteEvent(event.id))
    
    toast({
      title: "Event Deleted",
      description: `${event.title} has been deleted successfully`,
    })
    
    setIsDeleting(false)
  }

  const handleClone = async () => {
    setIsCloning(true)
    toast({
      title: "Cloning Event",
      description: "Creating a copy of your event...",
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const clonedEvent = {
      ...event,
      id: Date.now().toString(),
      title: `${event.title} (Copy)`,
      attendees: 0,
      revenue: 0,
      checkinRate: 0,
      rating: 0,
      status: "upcoming" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    dispatch(appActions.addEvent(clonedEvent))
    
    setIsCloning(false)
    toast({
      title: "Event Cloned Successfully!",
      description: `"${clonedEvent.title}" has been created`,
    })
  }

  const handleShare = async () => {
    setIsSharing(true)
    
    const shareUrl = `${window.location.origin}/events/${event.id}`
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
          url: shareUrl
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        toast({
          title: "Link Copied!",
          description: "Event link has been copied to clipboard",
        })
      }
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Unable to share at the moment",
        variant: "destructive"
      })
    } finally {
      setIsSharing(false)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden border hover:border-primary/30">
      <div className="relative">
        <div className="absolute top-3 right-3 z-10">
          <Badge className={cn("text-white", getStatusColor(event.status))}>
            {getStatusText(event.status)}
          </Badge>
        </div>
        
        {event.status === "live" && (
          <div className="absolute top-3 left-3 z-10">
            <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-sm rounded-full px-2 py-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-700 font-medium">Live</span>
            </div>
          </div>
        )}
        
        <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center cursor-pointer hover:from-primary/30 hover:to-primary/15 transition-all duration-200"
             onClick={handleManage}>
          <div className="text-center p-4">
            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {event.title}
            </h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatTime(event.time)}</span>
              </div>
              {event.location && (
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate max-w-[150px]">{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" 
               onClick={() => toast({ title: "Revenue Details", description: `Total revenue: €${event.revenue}` })}>
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="h-4 w-4 text-green-600 mr-1" />
              <div className="font-semibold text-sm">€{event.revenue}</div>
            </div>
            <div className="text-xs text-muted-foreground">Revenue</div>
          </div>
          
          <div className="text-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
               onClick={() => toast({ title: "Check-in Stats", description: `${event.checkinRate}% of attendees have checked in` })}>
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="h-4 w-4 text-blue-600 mr-1" />
              <div className="font-semibold text-sm">{event.checkinRate}%</div>
            </div>
            <div className="text-xs text-muted-foreground">Check-in</div>
          </div>
          
          <div className="text-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
               onClick={() => toast({ title: "Event Rating", description: `Average rating: ${event.rating}/5 stars` })}>
            <div className="flex items-center justify-center mb-1">
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
              <div className="font-semibold text-sm">{event.rating}</div>
            </div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
        </div>

        {/* Attendee Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
             onClick={() => toast({ title: "Attendee List", description: `${event.attendees} people are attending this event` })}>
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
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" onClick={handleAnalytics}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button size="sm" variant="outline" onClick={handleManage}>
              <Settings className="h-4 w-4 mr-2" />
              Manage
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="flex-1 text-xs" 
              onClick={handleClone}
              disabled={isCloning}
            >
              <Copy className="h-3 w-3 mr-1" />
              {isCloning ? "Cloning..." : "Clone"}
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="flex-1 text-xs" 
              onClick={handleShare}
              disabled={isSharing}
            >
              <Share2 className="h-3 w-3 mr-1" />
              {isSharing ? "Sharing..." : "Share"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}