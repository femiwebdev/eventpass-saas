"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Share2, Printer } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PassPreviewPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("standard")

  // Sample event data
  const event = {
    name: "Annual Tech Conference",
    date: "June 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
  }

  // Sample attendee data
  const attendee = {
    name: "John Smith",
    email: "john.smith@example.com",
    passType: "VIP",
    passId: "PASS-1234",
    seat: "A12",
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
            Pass Preview
          </motion.h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            className="w-full md:w-2/3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="vip">VIP</TabsTrigger>
                <TabsTrigger value="digital">Digital</TabsTrigger>
              </TabsList>

              <div className="border rounded-lg overflow-hidden">
                <TabsContent value="standard">
                  <div className="bg-white dark:bg-gray-900 p-0">
                    <div className="bg-blue-600 text-white p-6">
                      <h2 className="text-2xl font-bold">{event.name}</h2>
                      <p className="opacity-90">
                        {event.date} • {event.time}
                      </p>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-4">Attendee Information</h3>
                          <p className="text-2xl font-bold mb-1">{attendee.name}</p>
                          <p className="text-gray-500 mb-4">{attendee.email}</p>

                          <div className="mb-4">
                            <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full px-3 py-1 text-sm font-semibold">
                              {attendee.passType}
                            </span>
                          </div>

                          <p className="text-sm text-gray-500">Pass ID: {attendee.passId}</p>
                          <p className="text-sm font-medium">Seat/Table: {attendee.seat}</p>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-white p-3 rounded-lg border mb-2">
                            {/* QR Code placeholder */}
                            <div className="h-32 w-32 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center">
                              QR Code
                              <br />
                              Placeholder
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">Scan for check-in</p>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t">
                        <h3 className="text-lg font-bold mb-2">Event Location</h3>
                        <p>{event.location}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="vip">
                  <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <span className="inline-block bg-yellow-500 text-black rounded-full px-4 py-1 text-sm font-bold mb-4">
                          VIP ACCESS
                        </span>
                        <h2 className="text-3xl font-bold">{event.name}</h2>
                        <p className="opacity-90">
                          {event.date} • {event.time}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        {/* QR Code placeholder */}
                        <div className="h-24 w-24 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center">
                          QR Code
                          <br />
                          Placeholder
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-4">
                      <h3 className="text-xl font-bold mb-4">Attendee Information</h3>
                      <p className="text-3xl font-bold mb-1">{attendee.name}</p>
                      <p className="opacity-75 mb-4">{attendee.email}</p>

                      <div className="flex justify-between items-center mt-6">
                        <div>
                          <p className="text-sm opacity-75">Pass ID</p>
                          <p className="font-medium">{attendee.passId}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-75">Seat/Table</p>
                          <p className="font-medium">{attendee.seat}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-75">Location</p>
                          <p className="font-medium">San Francisco</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="digital">
                  <div className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                      <h2 className="text-2xl font-bold">{event.name}</h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        {event.date} • {event.time}
                      </p>
                    </div>

                    <div className="flex justify-center mb-6">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        {/* QR Code placeholder */}
                        <div className="h-40 w-40 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center">
                          QR Code
                          <br />
                          Placeholder
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                      <h3 className="text-lg font-bold mb-4 text-center">Attendee Information</h3>
                      <p className="text-xl font-bold text-center mb-1">{attendee.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-center mb-4">{attendee.email}</p>

                      <div className="flex justify-center mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full px-3 py-1 text-sm font-semibold">
                          {attendee.passType}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Pass ID</p>
                          <p className="font-medium">{attendee.passId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Seat/Table</p>
                          <p className="font-medium">{attendee.seat}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>

          <motion.div
            className="w-full md:w-1/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Pass Actions</h2>

              <div className="space-y-3">
                <Button className="w-full flex items-center justify-center" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download Pass
                </Button>

                <Button variant="outline" className="w-full flex items-center justify-center" size="lg">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Pass
                </Button>

                <Button variant="outline" className="w-full flex items-center justify-center" size="lg">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Pass
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Pass Template</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Choose from different pass templates to customize the appearance.
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <div
                    className={`border rounded p-2 cursor-pointer ${activeTab === "standard" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""}`}
                    onClick={() => setActiveTab("standard")}
                  >
                    <div className="h-12 bg-blue-600 rounded-t"></div>
                    <div className="h-20 bg-white dark:bg-gray-800 rounded-b"></div>
                  </div>
                  <div
                    className={`border rounded p-2 cursor-pointer ${activeTab === "vip" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""}`}
                    onClick={() => setActiveTab("vip")}
                  >
                    <div className="h-32 bg-gradient-to-r from-purple-800 to-indigo-900 rounded"></div>
                  </div>
                  <div
                    className={`border rounded p-2 cursor-pointer ${activeTab === "digital" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""}`}
                    onClick={() => setActiveTab("digital")}
                  >
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-t flex items-center justify-center">
                      <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded"></div>
                    </div>
                    <div className="h-20 bg-white dark:bg-gray-800 rounded-b"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
