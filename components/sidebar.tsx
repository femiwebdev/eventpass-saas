"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { LanguageSwitcher } from "@/components/language-switcher"
import { UserAuthNav } from "@/components/user-auth-nav"
import { CalendarDays, CheckSquare, Clock, Home, LayoutDashboard, PlusCircle, Ticket } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const menuItems = [
    {
      icon: Home,
      label: "Home",
      href: "/",
    },
    {
      icon: PlusCircle,
      label: "Create Event",
      href: "/create-event",
    },
    {
      icon: CalendarDays,
      label: "Your Events",
      href: "/your-events",
    },
    {
      icon: CheckSquare,
      label: "Check-in",
      href: "/check-in",
    },
    {
      icon: Clock,
      label: "Check-in History",
      href: "/check-in-history",
    },
    {
      icon: Ticket,
      label: "Pass Preview",
      href: "/pass-preview",
    },
    {
      icon: LayoutDashboard,
      label: "Analytics",
      href: "/event-dashboard/evt-001",
    },
  ]

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between p-2">
            <Link href="/" className="flex items-center space-x-2">
              <Ticket className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EventPass</span>
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive(item.href)}>
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex flex-col space-y-2 p-2">
            <LanguageSwitcher />
            <div className="flex items-center justify-between">
              <UserAuthNav />
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
