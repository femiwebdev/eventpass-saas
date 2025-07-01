"use client"

import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/lib/store"
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react"

export default function AnalyticsPage() {
  const { state } = useAppState()
  const { events } = state

  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0)
  const totalAttendees = events.reduce((sum, event) => sum + event.attendees, 0)
  const avgRating = events.reduce((sum, event) => sum + event.rating, 0) / events.length || 0
  const avgCheckinRate = events.reduce((sum, event) => sum + event.checkinRate, 0) / events.length || 0

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
              <p className="text-sm text-muted-foreground">Track your event performance and insights</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-600">€{totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% from last month
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                    <p className="text-3xl font-bold text-blue-600">{totalAttendees.toLocaleString()}</p>
                    <p className="text-xs text-blue-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8% from last month
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                    <p className="text-3xl font-bold text-yellow-600">{avgRating.toFixed(1)}</p>
                    <p className="text-xs text-yellow-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +0.2 from last month
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Check-in Rate</p>
                    <p className="text-3xl font-bold text-purple-600">{avgCheckinRate.toFixed(0)}%</p>
                    <p className="text-xs text-purple-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5% from last month
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Revenue chart will be displayed here</p>
                    <p className="text-xs text-muted-foreground">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Event Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Event distribution chart</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Live: {events.filter(e => e.status === 'live').length}</Badge>
                        <Badge variant="outline">Upcoming: {events.filter(e => e.status === 'upcoming').length}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Event Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Event</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Attendees</th>
                      <th className="text-left p-2">Revenue</th>
                      <th className="text-left p-2">Check-in Rate</th>
                      <th className="text-left p-2">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{event.title}</td>
                        <td className="p-2">
                          <Badge variant={event.status === 'live' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                        </td>
                        <td className="p-2">{event.attendees}</td>
                        <td className="p-2">€{event.revenue}</td>
                        <td className="p-2">{event.checkinRate}%</td>
                        <td className="p-2">{event.rating}/5</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </>
  )
}