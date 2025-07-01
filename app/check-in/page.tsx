"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useAppState, appActions } from "@/lib/store"
import { 
  QrCode, 
  UserCheck, 
  Users, 
  Search,
  CheckCircle,
  Clock,
  Scan
} from "lucide-react"

export default function CheckIn() {
  const [qrCode, setQrCode] = useState("")
  const [manualCode, setManualCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const { state, dispatch } = useAppState()
  const { events, checkedInAttendees } = state
  const { toast } = useToast()

  const handleQRScan = async () => {
    if (!qrCode.trim()) return

    setIsScanning(true)
    
    // Simulate QR scan processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const attendeeData = {
      id: Date.now().toString(),
      name: `Attendee ${Math.floor(Math.random() * 1000)}`,
      passCode: qrCode,
      eventId: events[0]?.id || '1'
    }
    
    dispatch(appActions.checkInAttendee(attendeeData))
    
    toast({
      title: "Check-in Successful! ✅",
      description: `${attendeeData.name} has been checked in`
    })
    
    setQrCode("")
    setIsScanning(false)
  }

  const handleManualCheckIn = async () => {
    if (!manualCode.trim()) return

    const attendeeData = {
      id: Date.now().toString(),
      name: `Manual Check-in ${Math.floor(Math.random() * 1000)}`,
      passCode: manualCode,
      eventId: events[0]?.id || '1'
    }
    
    dispatch(appActions.checkInAttendee(attendeeData))
    
    toast({
      title: "Manual Check-in Successful! ✅",
      description: `${attendeeData.name} has been checked in manually`
    })
    
    setManualCode("")
  }

  const recentCheckIns = checkedInAttendees.slice(-5).reverse()

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Event Check-in</h1>
              <p className="text-sm text-muted-foreground">Scan QR codes or manually check in attendees</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <Users className="h-3 w-3 mr-1" />
                {checkedInAttendees.length} Checked In
              </Badge>
            </div>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* QR Code Scanner */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  QR Code Scanner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center bg-primary/5">
                  <QrCode className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Point your camera at the QR code or enter code manually
                  </p>
                  <Button className="mb-4" variant="outline">
                    <Scan className="h-4 w-4 mr-2" />
                    Start Camera Scan
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Or enter QR code manually:</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter QR code or pass ID"
                      value={qrCode}
                      onChange={(e) => setQrCode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleQRScan()}
                    />
                    <Button 
                      onClick={handleQRScan} 
                      disabled={!qrCode.trim() || isScanning}
                    >
                      {isScanning ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      ) : (
                        <UserCheck className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manual Check-in */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Manual Check-in
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Attendee Pass Code:</label>
                    <Input
                      placeholder="Enter attendee pass code"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleManualCheckIn()}
                    />
                  </div>

                  <Button 
                    onClick={handleManualCheckIn}
                    disabled={!manualCode.trim()}
                    className="w-full"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Check In Manually
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      Find Attendee
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Check-ins */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Check-ins
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentCheckIns.length === 0 ? (
                <div className="text-center py-8">
                  <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No check-ins yet</p>
                  <p className="text-sm text-muted-foreground">Start scanning QR codes to see attendees here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentCheckIns.map((attendee) => (
                    <div key={attendee.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">{attendee.name}</p>
                          <p className="text-sm text-muted-foreground">Pass: {attendee.passCode}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600 font-medium">Checked In</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(attendee.checkedInAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{checkedInAttendees.length}</p>
                <p className="text-sm text-muted-foreground">Total Check-ins</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {checkedInAttendees.filter(a => {
                    const checkInTime = new Date(a.checkedInAt)
                    const now = new Date()
                    return (now.getTime() - checkInTime.getTime()) < 3600000 // Last hour
                  }).length}
                </p>
                <p className="text-sm text-muted-foreground">Last Hour</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {events[0] ? Math.round((checkedInAttendees.length / events[0].attendees) * 100) : 0}%
                </p>
                <p className="text-sm text-muted-foreground">Check-in Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </>
  )
}
