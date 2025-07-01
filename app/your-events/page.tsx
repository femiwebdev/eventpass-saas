"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { EnhancedEventCard } from "@/components/enhanced-event-card"
import { useAppState } from "@/lib/store"
import { 
  Search, 
  Filter, 
  Plus,
  Calendar,
  BarChart3,
  Download
} from "lucide-react"
import Link from "next/link"

export default function YourEvents() {
  const { state } = useAppState()
  const { events } = state
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: events.length,
    live: events.filter(e => e.status === 'live').length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    completed: events.filter(e => e.status === 'completed').length
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Your Events</h1>
              <p className="text-sm text-muted-foreground">Manage and monitor all your events</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
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

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              {(['all', 'live', 'upcoming', 'completed'] as const).map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status} ({statusCounts[status]})
                </Button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? "Try adjusting your search or filters" 
                  : "Get started by creating your first event"
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link href="/create-event">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Event
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EnhancedEventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </>
  )
}
