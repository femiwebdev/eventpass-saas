"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, QrCode, Copy, Printer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock event data
const getEventData = (eventId: string) => {
  return {
    id: eventId,
    name: "Annual Tech Conference",
    date: "June 15, 2025",
    location: "San Francisco Convention Center",
  }
}

export default function GeneratePassesPage({ params }: { params: { eventId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [numberOfPasses, setNumberOfPasses] = useState(1)
  const [passes, setPasses] = useState<Array<{ id: string; name: string; seat: string; qrData: string }>>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const event = getEventData(params.eventId)

  // Initialize passes when number changes
  useEffect(() => {
    const newPasses = Array.from({ length: numberOfPasses }, (_, index) => ({
      id: `PASS-${Math.floor(1000 + Math.random() * 9000)}`,
      name: "",
      seat: "",
      qrData: "",
    }))
    setPasses(newPasses)
  }, [numberOfPasses])

  const handleNameChange = (index: number, value: string) => {
    const updatedPasses = [...passes]
    updatedPasses[index].name = value
    setPasses(updatedPasses)
  }

  const handleSeatChange = (index: number, value: string) => {
    const updatedPasses = [...passes]
    updatedPasses[index].seat = value
    setPasses(updatedPasses)
  }

  const generatePasses = () => {
    setIsGenerating(true)

    // Validate that all passes have names and seats
    const incomplete = passes.some((pass) => !pass.name || !pass.seat)
    if (incomplete) {
      toast({
        title: "Incomplete Information",
        description: "Please provide name and seat number for all passes.",
        variant: "destructive",
      })
      setIsGenerating(false)
      return
    }

    // Generate QR data for each pass
    const updatedPasses = passes.map((pass) => ({
      ...pass,
      qrData: JSON.stringify({
        passId: pass.id,
        eventId: event.id,
        eventName: event.name,
        attendeeName: pass.name,
        seat: pass.seat,
        timestamp: new Date().toISOString(),
      }),
    }))

    // Simulate API call
    setTimeout(() => {
      setPasses(updatedPasses)
      setIsGenerated(true)
      setIsGenerating(false)
      toast({
        title: "Passes Generated",
        description: `Successfully generated ${numberOfPasses} passes.`,
      })
    }, 1500)
  }

  const downloadAllPasses = () => {
    toast({
      title: "Download Started",
      description: "All passes are being prepared for download.",
    })
  }

  const copyPassLink = (pass: any) => {
    navigator.clipboard.writeText(`https://eventpass.example.com/pass/${event.id}/${pass.id}`)
    toast({
      title: "Link Copied",
      description: "Pass link has been copied to clipboard.",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Generate Passes for {event.name}</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pass Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="numberOfPasses">Number of Passes</Label>
              <Input
                id="numberOfPasses"
                type="number"
                min="1"
                max="100"
                value={numberOfPasses}
                onChange={(e) => setNumberOfPasses(Number.parseInt(e.target.value) || 1)}
                className="max-w-xs"
                disabled={isGenerated}
              />
            </div>

            {!isGenerated ? (
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium">Enter Attendee Details</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {passes.map((pass, index) => (
                    <div key={pass.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                      <div>
                        <Label htmlFor={`name-${index}`}>Attendee Name</Label>
                        <Input
                          id={`name-${index}`}
                          value={pass.name}
                          onChange={(e) => handleNameChange(index, e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`seat-${index}`}>Seat/Table Number</Label>
                        <Input
                          id={`seat-${index}`}
                          value={pass.seat}
                          onChange={(e) => handleSeatChange(index, e.target.value)}
                          placeholder="A12"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={generatePasses} disabled={isGenerating} className="mt-4">
                  {isGenerating ? "Generating..." : "Generate Passes"}
                </Button>
              </div>
            ) : (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Generated Passes</h3>
                  <Button onClick={downloadAllPasses} className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Download All Passes
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {passes.map((pass) => (
                    <Card key={pass.id} className="overflow-hidden">
                      <CardHeader className="bg-primary text-primary-foreground">
                        <CardTitle className="text-lg">{pass.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <div className="bg-white p-2 border rounded-lg mb-4">
                            <QrCode className="h-32 w-32" />
                          </div>
                          <div className="text-center space-y-1 mb-4">
                            <p className="font-medium">Pass ID: {pass.id}</p>
                            <p className="font-medium">Seat/Table: {pass.seat}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => copyPassLink(pass)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
