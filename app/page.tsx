"use client"

import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { EnhancedEventCard } from "@/components/enhanced-event-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppState } from "@/lib/store"
import { 
  Plus,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Bell,
  Search
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const { state } = useAppState()
  const { events, user } = state

  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0)
  const totalAttendees = events.reduce((sum, event) => sum + event.attendees, 0)
  const activeEvents = events.filter(event => event.status === 'live').length
  const upcomingEvents = events.filter(event => event.status === 'upcoming').length

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Welcome back, {user?.name}!</h1>
              <p className="text-sm text-muted-foreground">Manage your events and track performance</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Link href="/create-event">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                    <p className="text-2xl font-bold">{totalAttendees.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Events</p>
                    <p className="text-2xl font-bold">{activeEvents}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                    <p className="text-2xl font-bold">{upcomingEvents}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Events */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Events</CardTitle>
                <Link href="/your-events">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.slice(0, 3).map((event) => (
                  <EnhancedEventCard key={event.id} event={event} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </>
  )
}