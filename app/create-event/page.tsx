"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useAppState, appActions } from "@/lib/store"
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign,
  Save,
  Sparkles,
  Upload,
  Image as ImageIcon
} from "lucide-react"

export default function CreateEvent() {
  const router = useRouter()
  const { dispatch } = useAppState()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    capacity: "",
    category: "conference"
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      
      toast({
        title: "Image Uploaded",
        description: "Event image has been uploaded successfully"
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      price: parseFloat(formData.price) || 0,
      capacity: parseInt(formData.capacity) || 0,
      attendees: 0,
      revenue: 0,
      checkinRate: 0,
      rating: 0,
      status: "upcoming" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    dispatch(appActions.addEvent(newEvent))
    
    setIsLoading(false)
    toast({
      title: "Event Created Successfully! 🎉",
      description: `${formData.title} has been created and is ready for attendees`
    })

    router.push('/your-events')
  }

  const aiSuggestions = [
    { type: "time", suggestion: "2:00 PM", reason: "82% higher attendance" },
    { type: "day", suggestion: "Saturday", reason: "Best engagement rates" },
    { type: "price", suggestion: "€99", reason: "Optimal price point" }
  ]

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Create New Event</h1>
              <p className="text-sm text-muted-foreground">Set up your event with AI-powered recommendations</p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI Assisted
            </Badge>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter your event title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your event..."
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label>Event Image</Label>
                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        {selectedImage ? (
                          <div className="space-y-2">
                            <img src={selectedImage} alt="Event" className="max-h-32 mx-auto rounded" />
                            <p className="text-sm text-green-600">Image uploaded successfully</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <ImageIcon className="h-8 w-8 mx-auto text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">Upload an event image</p>
                              <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                            </div>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Date & Time */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5" />
                      Date & Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time *</Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          placeholder="Enter event location"
                          className="pl-10"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing & Capacity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing & Capacity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Ticket Price (€)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="price"
                            type="number"
                            placeholder="0.00"
                            className="pl-10"
                            value={formData.price}
                            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="capacity"
                            type="number"
                            placeholder="100"
                            className="pl-10"
                            value={formData.capacity}
                            onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Event...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Event
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>

            {/* AI Suggestions Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm capitalize">{suggestion.type}</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 px-2 text-xs"
                          onClick={() => {
                            if (suggestion.type === 'time') {
                              setFormData(prev => ({ ...prev, time: '14:00' }))
                            } else if (suggestion.type === 'price') {
                              setFormData(prev => ({ ...prev, price: '99' }))
                            }
                            toast({
                              title: "AI Suggestion Applied",
                              description: `${suggestion.suggestion} has been set`
                            })
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-sm font-medium text-primary">{suggestion.suggestion}</p>
                      <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs space-y-2">
                    <p>🎯 <strong>Best practices:</strong></p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Add engaging event description</li>
                      <li>• Include high-quality images</li>
                      <li>• Set competitive pricing</li>
                      <li>• Plan for 80% capacity</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  )
}
