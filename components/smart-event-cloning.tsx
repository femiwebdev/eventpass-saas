"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  Copy, 
  Calendar, 
  MapPin, 
  Users, 
  Repeat,
  Sparkles,
  ArrowRight
} from "lucide-react"

export function SmartEventCloning() {
  const cloneOptions = [
    {
      type: "series",
      icon: Repeat,
      title: "Clone as Series",
      description: "Create recurring events with smart scheduling",
      features: ["Auto-schedule dates", "Maintain pricing", "Copy all settings"],
      recommended: true
    },
    {
      type: "variant",
      icon: MapPin,
      title: "Clone with Variants",
      description: "Same event, different venues or dates",
      features: ["Multiple locations", "Different pricing", "Customizable details"],
      recommended: false
    },
    {
      type: "template",
      icon: Copy,
      title: "Save as Template",
      description: "Reusable template for future events",
      features: ["Template library", "Quick setup", "Easy customization"],
      recommended: false
    }
  ]

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Smart Cloning Options</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {cloneOptions.map((option) => (
          <Card 
            key={option.type} 
            className={cn(
              "relative transition-all duration-200 hover:shadow-lg cursor-pointer group",
              "border-2 hover:border-primary/30",
              option.recommended 
                ? "ring-2 ring-primary/20 bg-primary/5 border-primary/30" 
                : "border-border hover:bg-muted/20"
            )}
          >
            {option.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-primary text-primary-foreground text-xs px-3 py-1 shadow-md">
                  ⭐ Recommended
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4 pt-6">
              <div className="mx-auto mb-3 p-3 rounded-full bg-primary/10 w-fit">
                <option.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-base font-semibold">{option.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0 pb-6">
              <p className="text-sm text-muted-foreground mb-6 text-center leading-relaxed">
                {option.description}
              </p>
              
              <div className="space-y-3 mb-6">
                {option.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className={cn(
                  "w-full transition-all duration-200 group-hover:shadow-md",
                  option.recommended 
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                    : "border-2"
                )}
                variant={option.recommended ? "default" : "outline"}
                size="sm"
              >
                <span className="mr-2">Clone Event</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Sparkles className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1">Smart Cloning Tip</h4>
            <p className="text-xs text-muted-foreground">
              Our AI analyzes your event performance to suggest the best cloning strategy. 
              Series events typically see 40% higher attendance rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}