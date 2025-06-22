"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign,
  Calendar,
  MapPin,
  Target
} from "lucide-react"

export function AIInsightsDashboard() {
  const insights = [
    {
      type: "pricing",
      icon: DollarSign,
      title: "Optimal Pricing",
      recommendation: "€45-65 based on similar events",
      confidence: 92,
      impact: "high"
    },
    {
      type: "timing",
      icon: Clock,
      title: "Best Event Time",
      recommendation: "Saturday 2PM (82% attendance rate)",
      confidence: 87,
      impact: "high"
    },
    {
      type: "capacity",
      icon: Users,
      title: "Venue Capacity",
      recommendation: "150-200 seats for optimal engagement",
      confidence: 78,
      impact: "medium"
    },
    {
      type: "promotion",
      icon: Target,
      title: "Marketing Window",
      recommendation: "Start promotion 3 weeks before event",
      confidence: 85,
      impact: "medium"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((insight, index) => (
        <Card key={index} className="event-gradient-surface border border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <insight.icon className="h-4 w-4 text-primary" />
              {insight.title}
              <Badge 
                variant={insight.impact === "high" ? "default" : "secondary"}
                className="text-xs"
              >
                {insight.confidence}% confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">{insight.recommendation}</p>
            <div className="flex items-center justify-between">
              <Badge 
                variant={insight.impact === "high" ? "default" : "outline"}
                className="text-xs"
              >
                {insight.impact} impact
              </Badge>
              <Button size="sm" variant="outline" className="text-xs h-7">
                Apply
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}