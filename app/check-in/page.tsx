"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { motion } from "framer-motion"

type ValidationStatus = "none" | "valid" | "used" | "invalid"

export default function EventCheckInPage() {
  const [passLink, setPassLink] = useState("")
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>("none")
  const [seatNumber, setSeatNumber] = useState("A12")

  const handleValidate = () => {
    // Simulate validation logic
    if (!passLink) {
      setValidationStatus("invalid")
      return
    }

    // For demo purposes, we'll cycle through different statuses
    if (passLink.includes("valid")) {
      setValidationStatus("valid")
      setSeatNumber("A12")
    } else if (passLink.includes("used")) {
      setValidationStatus("used")
    } else {
      setValidationStatus("invalid")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <main className="container mx-auto py-10 px-4 max-w-md">
        <motion.h1
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Event Check-in
        </motion.h1>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* QR Code Scanning Area */}
          <div className="flex flex-col items-center">
            <div className="border-dashed border-2 border-gray-300 dark:border-gray-700 rounded-lg p-10 w-full max-w-sm aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              <Camera className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Scan QR Code</p>
            </div>
          </div>

          {/* Manual Entry */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Or enter pass link:</p>
            <div className="flex space-x-2">
              <Input
                value={passLink}
                onChange={(e) => setPassLink(e.target.value)}
                placeholder="https://event.example.com/pass/..."
                className="flex-1"
              />
              <Button onClick={handleValidate}>Validate</Button>
            </div>
          </div>

          {/* Validation Status */}
          {validationStatus !== "none" && (
            <motion.div
              className="rounded-lg p-6 border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                borderColor:
                  validationStatus === "valid"
                    ? "rgb(34, 197, 94)"
                    : validationStatus === "used"
                      ? "rgb(234, 179, 8)"
                      : "rgb(239, 68, 68)",
                backgroundColor:
                  validationStatus === "valid"
                    ? "rgba(34, 197, 94, 0.1)"
                    : validationStatus === "used"
                      ? "rgba(234, 179, 8, 0.1)"
                      : "rgba(239, 68, 68, 0.1)",
              }}
            >
              <div className="flex items-start space-x-3">
                {validationStatus === "valid" && (
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                )}
                {validationStatus === "used" && (
                  <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                )}
                {validationStatus === "invalid" && <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />}

                <div>
                  {validationStatus === "valid" && (
                    <>
                      <h3 className="font-bold text-green-600 dark:text-green-500 text-lg">
                        Valid Pass - Entry Allowed
                      </h3>
                      <p className="text-green-600 dark:text-green-500 mt-1">Seat/Table: {seatNumber}</p>
                    </>
                  )}
                  {validationStatus === "used" && (
                    <h3 className="font-bold text-yellow-600 dark:text-yellow-500 text-lg">Pass Already Used</h3>
                  )}
                  {validationStatus === "invalid" && (
                    <h3 className="font-bold text-red-600 dark:text-red-500 text-lg">Invalid Pass</h3>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Instructions */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="mb-2 font-medium">Testing Instructions:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Enter "valid" in the link to see a valid pass</li>
              <li>Enter "used" to see an already used pass</li>
              <li>Enter anything else to see an invalid pass</li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
