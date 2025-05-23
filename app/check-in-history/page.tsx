"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Search, Filter, Download, CheckCircle, XCircle, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample check-in data
const checkInHistory = [
  {
    id: "chk-001",
    attendeeName: "John Smith",
    passId: "PASS-1234",
    eventName: "Annual Tech Conference",
    checkInTime: "2025-06-15T09:15:00",
    status: "success",
    seat: "A12",
  },
  {
    id: "chk-002",
    attendeeName: "Sarah Johnson",
    passId: "PASS-2345",
    eventName: "Annual Tech Conference",
    checkInTime: "2025-06-15T09:22:00",
    status: "success",
    seat: "A13",
  },
  {
    id: "chk-003",
    attendeeName: "Michael Brown",
    passId: "PASS-3456",
    eventName: "Annual Tech Conference",
    checkInTime: "2025-06-15T09:30:00",
    status: "failed",
    seat: "B21",
  },
  {
    id: "chk-004",
    attendeeName: "Emily Davis",
    passId: "PASS-4567",
    eventName: "Annual Tech Conference",
    checkInTime: "2025-06-15T09:45:00",
    status: "success",
    seat: "B22",
  },
  {
    id: "chk-005",
    attendeeName: "David Wilson",
    passId: "PASS-5678",
    eventName: "Annual Tech Conference",
    checkInTime: "2025-06-15T10:05:00",
    status: "success",
    seat: "C15",
  },
]

export default function CheckInHistoryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  // Filter check-ins based on search term
  const filteredCheckIns = checkInHistory.filter(
    (checkIn) =>
      checkIn.attendeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checkIn.passId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <main className="container mx-auto py-10 px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => router.push("/")} className="mr-2 p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Check-in History
          </motion.h1>
        </div>

        {/* Search and Filter */}
        <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name or pass ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </motion.div>

        {/* Check-in History Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border rounded-lg overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attendee</TableHead>
                <TableHead>Pass ID</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Check-in Time</TableHead>
                <TableHead>Seat/Table</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCheckIns.map((checkIn) => (
                <TableRow key={checkIn.id}>
                  <TableCell className="font-medium">{checkIn.attendeeName}</TableCell>
                  <TableCell>{checkIn.passId}</TableCell>
                  <TableCell>{checkIn.eventName}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      {formatDate(checkIn.checkInTime)}
                    </div>
                  </TableCell>
                  <TableCell>{checkIn.seat}</TableCell>
                  <TableCell>
                    {checkIn.status === "success" ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Success
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <XCircle className="h-4 w-4 mr-1" />
                        Failed
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </main>
    </div>
  )
}
