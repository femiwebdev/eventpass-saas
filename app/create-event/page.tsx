"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle, Copy, Download } from "lucide-react"
import { useState } from "react"
import { TimePickerDemo } from "@/components/time-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function CreateEventPage() {
  const [eventName, setEventName] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [assignSeat, setAssignSeat] = useState(false)
  const [passesGenerated, setPassesGenerated] = useState(false)
  const [numberOfPasses, setNumberOfPasses] = useState(1)
  const [seatNumbers, setSeatNumbers] = useState<string[]>([""])
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const handleGeneratePasses = () => {
    setPassesGenerated(true)
    setTimeout(() => setPassesGenerated(false), 3000)
  }

  const handlePassNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 1
    setNumberOfPasses(value)

    // Update seat numbers array to match the number of passes
    if (value > seatNumbers.length) {
      // Add empty strings for new passes
      setSeatNumbers([...seatNumbers, ...Array(value - seatNumbers.length).fill("")])
    } else if (value < seatNumbers.length) {
      // Remove extra seat numbers
      setSeatNumbers(seatNumbers.slice(0, value))
    }
  }

  const handleSeatNumberChange = (index: number, value: string) => {
    const newSeatNumbers = [...seatNumbers]
    newSeatNumbers[index] = value
    setSeatNumbers(newSeatNumbers)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://event.example.com/pass/${eventName || "event-name"}/1?seat=${seatNumbers[0] || "A1"}`,
    )
    toast({
      title: "Link copied!",
      description: "The pass link has been copied to your clipboard.",
      action: <ToastAction altText="Close">Close</ToastAction>,
    })
  }

  const handleDownloadAll = () => {
    toast({
      title: "Preparing download...",
      description: "Your passes are being prepared for download.",
      action: <ToastAction altText="Close">Close</ToastAction>,
    })
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-10 px-4 max-w-2xl relative overflow-hidden bg-white dark:bg-gray-950"
    >
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Create Your Event
      </motion.h1>

      <motion.form
        className="space-y-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleCreateEvent}
      >
        <div className="space-y-2">
          <Label htmlFor="eventName">Event Name</Label>
          <Input
            id="eventName"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventDate">Event Date</Label>
          <DatePicker />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startTime">Event Start Time</Label>
          <TimePickerDemo value={startTime} onChange={setStartTime} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTime">Event End Time</Label>
          <TimePickerDemo value={endTime} onChange={setEndTime} />
        </div>

        <div className="flex space-x-4 pt-4">
          <Button
            type="submit"
            className="flex-1 relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span className="relative z-10">Create Event</span>
            {showSuccess && (
              <motion.div
                className="absolute inset-0 bg-green-500"
                initial={{ scale: 0, borderRadius: "100%" }}
                animate={{ scale: 1.5, borderRadius: "0%" }}
                transition={{ duration: 0.5 }}
              />
            )}
            {showSuccess && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CheckCircle className="text-white" />
              </motion.div>
            )}
            <motion.div
              className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
          >
            Cancel
          </Button>
        </div>
      </motion.form>

      {/* Generate Passes Section */}
      <motion.div
        className="mt-16 pt-8 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h2
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          Generate Passes for {eventName || "[Event Name]"}
        </motion.h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="mb-2">Enter the number of passes to generate:</p>
            <Input
              type="number"
              min="1"
              value={numberOfPasses}
              onChange={handlePassNumberChange}
              className="max-w-xs transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="assignSeat"
              checked={assignSeat}
              onCheckedChange={(checked) => setAssignSeat(checked as boolean)}
              className="transition-all duration-300 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="assignSeat" className="cursor-pointer">
              Assign Seat/Table Number?
            </Label>
          </div>

          {assignSeat && (
            <motion.div
              className="space-y-4 pl-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <Label className="font-medium">Individual Seat/Table Assignments</Label>
                <p className="text-sm text-gray-500">({numberOfPasses} passes)</p>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {Array.from({ length: numberOfPasses }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full text-blue-700 dark:text-blue-300 font-medium">
                      {index + 1}
                    </div>
                    <Input
                      value={seatNumbers[index] || ""}
                      onChange={(e) => handleSeatNumberChange(index, e.target.value)}
                      placeholder={`Seat/Table for pass #${index + 1}`}
                      className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="pt-4">
            <Button
              onClick={handleGeneratePasses}
              className="relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <span className="relative z-10">Generate Passes</span>
              {passesGenerated && (
                <motion.div
                  className="absolute inset-0 bg-green-500"
                  initial={{ scale: 0, borderRadius: "100%" }}
                  animate={{ scale: 1.5, borderRadius: "0%" }}
                  transition={{ duration: 0.5 }}
                />
              )}
              {passesGenerated && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <CheckCircle className="text-white" />
                </motion.div>
              )}
              <motion.div
                className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </div>

          {passesGenerated && (
            <motion.p
              className="text-green-600 dark:text-green-400 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Passes generated successfully!
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Pass Distribution Section */}
      {passesGenerated && (
        <motion.div
          className="mt-16 pt-8 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Pass Distribution for {eventName || "[Event Name]"}
          </motion.h2>

          <div className="space-y-8">
            <div>
              <Button
                onClick={handleDownloadAll}
                className="flex items-center space-x-2 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <Download className="h-5 w-5" />
                <span>Download All Passes as ZIP</span>
              </Button>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Single Pass Link (for testing):</h3>

              <div className="flex space-x-2">
                <Input
                  readOnly
                  value={`https://event.example.com/pass/${eventName || "event-name"}/1${seatNumbers[0] ? `?seat=${seatNumbers[0]}` : ""}`}
                  className="flex-1 bg-gray-50 dark:bg-gray-900"
                />
                <Button
                  onClick={handleCopyLink}
                  className="flex items-center space-x-2 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  variant="outline"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy Link and Seat/Table</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.main>
  )
}

function DatePicker() {
  const [date, setDate] = useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal transition-all duration-300",
            !date && "text-muted-foreground",
            "hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02]",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : "Select date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
