"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Plus, Calendar, Users, BarChart2, Filter, Ticket } from "lucide-react"

// Sample event data
const sampleEvents = [
  {
    id: "evt-001",
    name: "Annual Tech Conference",
    date: "2025-06-15",
    location: "San Francisco Convention Center",
    attendees: 250,
    checkedIn: 0,
  },
  {
    id: "evt-002",
    name: "Product Launch Party",
    date: "2025-07-22",
    location: "New York Marriott",
    attendees: 120,
    checkedIn: 0,
  },
  {
    id: "evt-003",
    name: "Team Building Retreat",
    date: "2025-08-10",
    location: "Mountain View Resort",
    attendees: 45,
    checkedIn: 0,
  },
  {
    id: "evt-004",
    name: "Quarterly Stakeholder Meeting",
    date: "2025-09-05",
    location: "Virtual",
    attendees: 80,
    checkedIn: 0,
  },
]

export default function YourEventsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [events, setEvents] = useState(sampleEvents)

  // Filter events based on search term
  const filteredEvents = events.filter((event) => event.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <main className="container mx-auto py-10 px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.h1
            className="text-3xl font-bold mb-4 md:mb-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Events
          </motion.h1>

          <Button onClick={() => router.push("/create-event")} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create New Event</span>
          </Button>
        </div>

        {/* Search and Filter */}
        <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </motion.div>

        {/* Events List */}
        <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-bold text-lg">{event.name}</div>
                    <div className="text-gray-500 flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(event.date)}
                    </div>
                    <div className="text-gray-500 flex items-center mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees} attendees
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/generate-passes/${event.id}`)}
                      className="flex items-center"
                    >
                      <Ticket className="h-4 w-4 mr-1" />
                      Generate Passes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/event-dashboard/${event.id}`)}
                      className="flex items-center"
                    >
                      <BarChart2 className="h-4 w-4 mr-1" />
                      Dashboard
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              No events found. Try a different search term or create a new event.
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
