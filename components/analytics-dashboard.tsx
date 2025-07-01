"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react"

export function AnalyticsDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [timeRange, setTimeRange] = useState('7d')
  const [data, setData] = useState({
    totalRevenue: 15420,
    totalAttendees: 1250,
    eventsCount: 8,
    avgRating: 4.6,
    revenueGrowth: 23,
    attendeeGrowth: 15
  })

  const refreshData = async () => {
    setIsRefreshing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Update with new random data
    setData(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 1000),
      totalAttendees: prev.totalAttendees + Math.floor(Math.random() * 100),
      revenueGrowth: Math.floor(Math.random() * 30) + 10,
      attendeeGrowth: Math.floor(Math.random() * 25) + 5
    }))
    
    setIsRefreshing(false)
  }

  const exportData = () => {
    // Simulate export
    const csvData = `
Event,Attendees,Revenue,Rating
Tech Conference 2024,127,2540,4.8
Business Summit,89,1850,4.5
Workshop Series,45,680,4.9
Networking Event,203,3200,4.3
    `.trim()
    
    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'event-analytics.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Updating...' : 'Refresh'}
          </Button>
          <Button size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">€{data.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="h-3 w-3" />
                  +{data.revenueGrowth}% vs last month
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                <p className="text-2xl font-bold">{data.totalAttendees.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="h-3 w-3" />
                  +{data.attendeeGrowth}% vs last month
                </div>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Events Hosted</p>
                <p className="text-2xl font-bold">{data.eventsCount}</p>
                <div className="flex items-center gap-1 text-blue-600 text-sm">
                  <Calendar className="h-3 w-3" />
                  This month
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">{data.avgRating}/5</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 w-3 rounded-full ${
                        i < Math.floor(data.avgRating) ? 'bg-yellow-400' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-yellow-400">★</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Events Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Tech Conference 2024", attendees: 127, revenue: 2540, status: "completed" },
              { name: "Business Summit", attendees: 89, revenue: 1850, status: "live" },
              { name: "Workshop Series", attendees: 45, revenue: 680, status: "upcoming" },
              { name: "Networking Event", attendees: 203, revenue: 3200, status: "completed" }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-medium">{event.name}</h4>
                    <p className="text-sm text-muted-foreground">{event.attendees} attendees • €{event.revenue}</p>
                  </div>
                </div>
                <Badge variant={event.status === 'live' ? 'default' : event.status === 'upcoming' ? 'secondary' : 'outline'}>
                  {event.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}