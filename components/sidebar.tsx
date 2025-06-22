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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { 
  CalendarDays, 
  CheckSquare, 
  Clock, 
  Home, 
  LayoutDashboard, 
  PlusCircle, 
  Ticket,
  Inbox,
  Search,
  Settings,
  Users,
  TicketIcon,
  BarChart3,
  CreditCard,
  Bell,
  LogOut,
  HelpCircle,
  Globe,
  ChevronRight,
  ChevronDown,
  Star,
  TrendingUp,
  FolderOpen,
  Wrench,
  User,
  Sparkles,
  Copy,
  Share2,
  Zap,
  Target,
  X,
} from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Enhanced menu items with AI insights and smart features
const primaryActions = [
  {
    icon: PlusCircle,
    label: "Create Event",
    href: "/create-event",
    description: "Start organizing with AI",
    isHighlight: true,
  },
  {
    icon: Copy,
    label: "Smart Clone",
    href: "/clone-event",
    description: "Duplicate with variants",
    isSecondary: true,
  },
]

const manageItems = [
  {
    icon: CalendarDays,
    label: "Events",
    href: "/your-events",
    description: "Manage your events",
    badge: "3 active",
    notification: true,
  },
  {
    icon: Users,
    label: "Attendees",
    href: "/attendees",
    description: "View registrations",
    badge: "127 new",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/analytics",
    description: "AI-powered insights",
    highlight: true,
  },
  {
    icon: Ticket,
    label: "Orders",
    href: "/orders",
    description: "Sales & refunds",
  },
]

const toolsItems = [
  {
    icon: CheckSquare,
    label: "Live Check-in",
    href: "/check-in",
    description: "Real-time entry",
    status: "live",
  },
  {
    icon: Clock,
    label: "Check-in History",
    href: "/check-in-history",
    description: "Past entries",
  },
  {
    icon: Search,
    label: "Discover Events",
    href: "/discover",
    description: "Find inspiration",
  },
  {
    icon: Share2,
    label: "Social Auto-Post",
    href: "/social-automation",
    description: "Automated promotion",
    isNew: true,
  },
]

const accountItems = [
  {
    title: "Account Settings",
    url: "/settings",
    icon: Settings,
    description: "Profile & preferences",
  },
  {
    title: "Billing & Plans",
    url: "/billing",
    icon: CreditCard,
    description: "Subscription management",
  },
  {
    title: "Help Center",
    url: "/help",
    icon: HelpCircle,
    description: "Get support",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [isManageOpen, setIsManageOpen] = React.useState(false)
  const [isToolsOpen, setIsToolsOpen] = React.useState(false)
  const [isAccountOpen, setIsAccountOpen] = React.useState(false)
  const [showAIInsight, setShowAIInsight] = React.useState(true)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const isManageActive = () => {
    return manageItems.some(item => isActive(item.href))
  }

  const isToolsActive = () => {
    return toolsItems.some(item => isActive(item.href))
  }

  const isAccountActive = () => {
    return accountItems.some(item => isActive(item.url))
  }

  return (
    <SidebarProvider>
      <Sidebar 
        variant="inset" 
        className="border-r-0 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-md w-72"
      >
        {/* Header Section - Fixed Height */}
        <SidebarHeader className="border-b border-border/50 bg-background/20 backdrop-blur-sm p-6 min-h-[140px] flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30">
              <TicketIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="font-bold text-lg">EventPass</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Event Management</p>
            </div>
            <Badge variant="secondary" className="text-xs">Pro</Badge>
          </div>

          {/* AI Insight Card - Compact Design */}
          {showAIInsight && (
            <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/30">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs text-primary">AI Suggestion</p>
                  <p className="text-xs text-muted-foreground">Saturday 2PM gets 82% higher attendance</p>
                </div>
                <button 
                  onClick={() => setShowAIInsight(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-0.5 hover:bg-background/20 rounded"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </SidebarHeader>
        
        {/* Content Section - Scrollable with Even Spacing */}
        <SidebarContent className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Primary Actions Section */}
          <div className="space-y-3">
            {primaryActions.map((item) => (
              <SidebarMenuButton 
                key={item.label}
                asChild
                className={cn(
                  "h-auto p-4 rounded-xl transition-all duration-200",
                  item.isHighlight 
                    ? "bg-primary/10 backdrop-blur-sm border border-primary/30 hover:bg-primary/20 hover:border-primary/50 hover:shadow-lg"
                    : "bg-background/20 backdrop-blur-sm border border-border/30 hover:bg-background/40 hover:border-border/50 hover:shadow-md",
                  "active:scale-[0.98]"
                )}
              >
                <Link href={item.href} className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg backdrop-blur-sm",
                    item.isHighlight ? "bg-primary/20" : "bg-background/40"
                  )}>
                    <item.icon className={cn(
                      "h-5 w-5",
                      item.isHighlight ? "text-primary" : "text-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SidebarMenuButton>
            ))}
          </div>

          {/* Manage Section */}
          <SidebarGroup className="space-y-0">
            <Collapsible open={isManageOpen} onOpenChange={setIsManageOpen}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton 
                  className={cn(
                    "h-auto p-3 rounded-lg transition-all duration-200 mb-3",
                    "bg-background/20 backdrop-blur-sm border border-border/30",
                    "hover:bg-background/40 hover:border-border/50 hover:shadow-md",
                    "active:scale-[0.98]",
                    isManageActive() && "bg-primary/15 border-primary/40"
                  )}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background/40 backdrop-blur-sm">
                      <FolderOpen className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">Manage</div>
                      <div className="text-xs text-muted-foreground">Event management tools</div>
                    </div>
                    {manageItems.some(item => item.notification) && (
                      <div className="h-2 w-2 bg-primary rounded-full" />
                    )}
                    <div className={cn(
                      "transition-transform duration-200",
                      isManageOpen && "rotate-180"
                    )}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="transition-all duration-200">
                <SidebarMenuSub className="ml-4 space-y-1.5">
                  {manageItems.map((item) => (
                    <SidebarMenuSubItem key={item.label}>
                      <SidebarMenuSubButton 
                        asChild
                        data-active={isActive(item.href)}
                        className={cn(
                          "h-auto p-2.5 rounded-md transition-all duration-200",
                          "bg-background/10 backdrop-blur-sm border border-border/20",
                          "hover:bg-background/30 hover:border-border/40 hover:shadow-sm",
                          "active:scale-[0.98]",
                          "data-[active=true]:bg-primary/10 data-[active=true]:border-primary/30",
                          "data-[active=true]:shadow-sm",
                          item.highlight && "ring-1 ring-primary/20"
                        )}
                      >
                        <Link href={item.href} className="flex items-center gap-3 w-full">
                          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-background/30 backdrop-blur-sm relative">
                            <item.icon className="h-3.5 w-3.5" />
                            {item.highlight && (
                              <Sparkles className="h-2 w-2 text-primary absolute -top-0.5 -right-0.5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-xs flex items-center gap-1">
                              {item.label}
                              {item.highlight && <Zap className="h-2.5 w-2.5 text-primary" />}
                            </div>
                            <div className="text-[10px] text-muted-foreground truncate">{item.description}</div>
                          </div>
                          {item.badge && (
                            <Badge variant={item.notification ? "default" : "secondary"} 
                                   className={cn(
                                     "text-[10px] px-1.5 py-0.5",
                                     item.notification ? "bg-primary/20 text-primary" : "bg-background/50"
                                   )}>
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
          
          {/* Tools Section */}
          <SidebarGroup className="space-y-0">
            <Collapsible open={isToolsOpen} onOpenChange={setIsToolsOpen}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton 
                  className={cn(
                    "h-auto p-3 rounded-lg transition-all duration-200 mb-3",
                    "bg-background/20 backdrop-blur-sm border border-border/30",
                    "hover:bg-background/40 hover:border-border/50 hover:shadow-md",
                    "active:scale-[0.98]",
                    isToolsActive() && "bg-primary/15 border-primary/40"
                  )}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background/40 backdrop-blur-sm">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">Smart Tools</div>
                      <div className="text-xs text-muted-foreground">AI-powered utilities</div>
                    </div>
                    <div className={cn(
                      "transition-transform duration-200",
                      isToolsOpen && "rotate-180"
                    )}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="transition-all duration-200">
                <SidebarMenuSub className="ml-4 space-y-1.5">
                  {toolsItems.map((item) => (
                    <SidebarMenuSubItem key={item.label}>
                      <SidebarMenuSubButton 
                        asChild
                        data-active={isActive(item.href)}
                        className={cn(
                          "h-auto p-2.5 rounded-md transition-all duration-200",
                          "bg-background/10 backdrop-blur-sm border border-border/20",
                          "hover:bg-background/30 hover:border-border/40 hover:shadow-sm",
                          "active:scale-[0.98]",
                          "data-[active=true]:bg-primary/10 data-[active=true]:border-primary/30",
                          "data-[active=true]:shadow-sm"
                        )}
                      >
                        <Link href={item.href} className="flex items-center gap-3 w-full">
                          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-background/30 backdrop-blur-sm relative">
                            <item.icon className="h-3.5 w-3.5" />
                            {item.status === "live" && (
                              <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-xs flex items-center gap-1">
                              {item.label}
                              {item.isNew && <Badge className="text-[8px] px-1 py-0 h-4">New</Badge>}
                            </div>
                            <div className="text-[10px] text-muted-foreground truncate">{item.description}</div>
                          </div>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>

          {/* Account Section */}
          <SidebarGroup className="space-y-0">
            <Collapsible open={isAccountOpen} onOpenChange={setIsAccountOpen}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton 
                  className={cn(
                    "h-auto p-3 rounded-lg transition-all duration-200 mb-3",
                    "bg-background/20 backdrop-blur-sm border border-border/30",
                    "hover:bg-background/40 hover:border-border/50 hover:shadow-md",
                    "active:scale-[0.98]",
                    isAccountActive() && "bg-primary/15 border-primary/40"
                  )}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.jpg" />
                      <AvatarFallback className="bg-primary/20 text-primary font-medium text-xs">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">John Doe</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        Pro Organizer
                        <Star className="h-2.5 w-2.5 text-yellow-500 fill-current" />
                      </div>
                    </div>
                    <div className={cn(
                      "transition-transform duration-200",
                      isAccountOpen && "rotate-180"
                    )}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="transition-all duration-200">
                <SidebarMenuSub className="ml-4 space-y-1.5">
                  {accountItems.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton 
                        asChild
                        data-active={isActive(item.url)}
                        className={cn(
                          "h-auto p-2.5 rounded-md transition-all duration-200",
                          "bg-background/10 backdrop-blur-sm border border-border/20",
                          "hover:bg-background/30 hover:border-border/40 hover:shadow-sm",
                          "active:scale-[0.98]",
                          "data-[active=true]:bg-primary/10 data-[active=true]:border-primary/30",
                          "data-[active=true]:shadow-sm"
                        )}
                      >
                        <Link href={item.url} className="flex items-center gap-3 w-full">
                          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-background/30 backdrop-blur-sm">
                            <item.icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-xs">{item.title}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{item.description}</div>
                          </div>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        </SidebarContent>
        
        {/* Footer Section - Fixed Height */}
        <SidebarFooter className="border-t border-border/50 bg-background/20 backdrop-blur-sm p-4 min-h-[180px] flex flex-col justify-end">
          {/* Enhanced Stats with Achievements */}
          <div className="mb-4 p-3 rounded-lg bg-background/30 backdrop-blur-sm border border-border/30">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground">This month</span>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span className="font-medium">+23%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="font-semibold">127</div>
                <div className="text-muted-foreground">tickets sold</div>
              </div>
              <div>
                <div className="font-semibold flex items-center gap-1">
                  4.8 <Star className="h-2.5 w-2.5 text-yellow-500 fill-current" />
                </div>
                <div className="text-muted-foreground">avg rating</div>
              </div>
            </div>
            
            {/* Achievement Badge */}
            <div className="mt-2 p-2 bg-primary/10 rounded-md">
              <div className="flex items-center gap-2">
                <Target className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium text-primary">50% to Pro Milestone!</span>
              </div>
            </div>
          </div>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                className={cn(
                  "h-auto p-3 rounded-lg transition-all duration-200",
                  "bg-destructive/10 backdrop-blur-sm border border-destructive/30",
                  "hover:bg-destructive/20 hover:border-destructive/50 hover:shadow-md",
                  "active:scale-[0.98] text-destructive hover:text-destructive"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive/20 backdrop-blur-sm">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">Sign Out</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
