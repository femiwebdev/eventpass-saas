import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, CalendarDays, CheckSquare, PlusCircle, Ticket } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: <PlusCircle className="h-8 w-8 text-primary" />,
      title: "Create Events",
      description: "Create and customize events with detailed information",
      href: "/create-event",
    },
    {
      icon: <Ticket className="h-8 w-8 text-primary" />,
      title: "Generate Passes",
      description: "Generate digital passes for your event attendees",
      href: "/your-events",
    },
    {
      icon: <CheckSquare className="h-8 w-8 text-primary" />,
      title: "Check-in",
      description: "Easily check in attendees at your events",
      href: "/check-in",
    },
    {
      icon: <CalendarDays className="h-8 w-8 text-primary" />,
      title: "Manage Events",
      description: "View and manage all your events in one place",
      href: "/your-events",
    },
  ]

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to EventPass</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The all-in-one platform for creating, managing, and tracking your events
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="mb-2">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={feature.href}>
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Recent Events</h2>
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/your-events">View All Events</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
