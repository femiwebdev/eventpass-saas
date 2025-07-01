"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { 
  Camera, 
  UserCheck, 
  Users, 
  Scan,
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react"

export function InteractiveCheckin() {
  const [scanMode, setScanMode] = useState<'qr' | 'manual'>('qr')
  const [passCode, setPassCode] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [checkedInCount, setCheckedInCount] = useState(127)
  const [recentCheckins, setRecentCheckins] = useState([
    { id: 1, name: "John Doe", time: "2 mins ago", status: "success" },
    { id: 2, name: "Jane Smith", time: "5 mins ago", status: "success" },
    { id: 3, name: "Mike Johnson", time: "8 mins ago", status: "failed" },
  ])

  const simulateQRScan = () => {
    setIsScanning(true)
    
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false)
      const success = Math.random() > 0.2 // 80% success rate
      
      if (success) {
        const newCheckin = {
          id: Date.now(),
          name: `Guest ${Math.floor(Math.random() * 1000)}`,
          time: "Just now",
          status: "success" as const
        }
        
        setRecentCheckins(prev => [newCheckin, ...prev.slice(0, 4)])
        setCheckedInCount(prev => prev + 1)
        
        toast({
          title: "Check-in Successful! ✅",
          description: `${newCheckin.name} has been checked in`,
        })
      } else {
        const failedAttempt = {
          id: Date.now(),
          name: "Invalid Pass",
          time: "Just now",
          status: "failed" as const
        }
        
        setRecentCheckins(prev => [failedAttempt, ...prev.slice(0, 4)])
        
        toast({
          title: "Check-in Failed ❌",
          description: "Invalid or expired pass",
          variant: "destructive"
        })
      }
    }, 2000)
  }

  const handleManualCheckin = () => {
    if (!passCode.trim()) {
      toast({
        title: "Pass Code Required",
        description: "Please enter a pass code",
        variant: "destructive"
      })
      return
    }

    const success = passCode.length >= 6 // Simple validation
    
    if (success) {
      const newCheckin = {
        id: Date.now(),
        name: `Pass ${passCode.toUpperCase()}`,
        time: "Just now",
        status: "success" as const
      }
      
      setRecentCheckins(prev => [newCheckin, ...prev.slice(0, 4)])
      setCheckedInCount(prev => prev + 1)
      setPassCode('')
      
      toast({
        title: "Manual Check-in Successful! ✅",
        description: `Pass ${passCode.toUpperCase()} has been validated`,
      })
    } else {
      toast({
        title: "Invalid Pass Code",
        description: "Pass code must be at least 6 characters",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-semibold text-lg">{checkedInCount}</div>
                <div className="text-sm text-muted-foreground">Checked In</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-semibold text-lg">350</div>
                <div className="text-sm text-muted-foreground">Total Expected</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold text-lg">36%</div>
                <div className="text-sm text-muted-foreground">Check-in Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Check-in Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              QR Code Scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              {isScanning ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Scanning...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Scan className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Position QR code in frame</p>
                </div>
              )}
              
              {/* Scanning overlay */}
              <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-lg"></div>
            </div>
            
            <Button 
              onClick={simulateQRScan} 
              disabled={isScanning}
              className="w-full"
            >
              {isScanning ? "Scanning..." : "Simulate QR Scan"}
            </Button>
          </CardContent>
        </Card>

        {/* Manual Entry Section */}
        <Card>
          <CardHeader>
            <CardTitle>Manual Check-in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Pass Code</label>
              <Input
                placeholder="Enter pass code (e.g., EVT123456)"
                value={passCode}
                onChange={(e) => setPassCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualCheckin()}
              />
            </div>
            
            <Button onClick={handleManualCheckin} variant="outline" className="w-full">
              Manual Check-in
            </Button>
            
            <div className="text-xs text-muted-foreground">
              Use this for backup when QR scanning isn't available
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Check-ins */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentCheckins.map((checkin) => (
              <div key={checkin.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  {checkin.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <div>
                    <div className="font-medium text-sm">{checkin.name}</div>
                    <div className="text-xs text-muted-foreground">{checkin.time}</div>
                  </div>
                </div>
                <Badge variant={checkin.status === 'success' ? 'default' : 'destructive'}>
                  {checkin.status === 'success' ? 'Success' : 'Failed'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}