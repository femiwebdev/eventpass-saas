"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Calendar,
  Plus,
  Ticket,
  BarChart3,
  CheckSquare,
  History,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Search,
  Bell
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    badge: null,
  },
  {
    title: "Create Event",
    href: "/create-event",
    icon: Plus,
    badge: null,
  },
  {
    title: "Your Events",
    href: "/your-events",
    icon: Calendar,
    badge: null,
  },
  {
    title: "Check-in",
    href: "/check-in",
    icon: CheckSquare,
    badge: null,
  },
  {
    title: "Check-in History",
    href: "/check-in-history",
    icon: History,
    badge: null,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    badge: "New",
  },
]

const bottomNavigationItems = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
]

export function SideNavigation() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const isAuthPage = pathname?.startsWith('/auth')

  if (isAuthPage) {
    return null
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCollapsed(true)}
          />
        )}
      </AnimatePresence>

      {/* Side Navigation */}
      <motion.aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 shadow-xl lg:relative lg:translate-x-0",
          isCollapsed ? "-translate-x-full lg:w-16" : "w-72 lg:w-72"
        )}
        animate={{
          width: isCollapsed ? (window.innerWidth >= 1024 ? 64 : 0) : 288,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-800/50">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Ticket className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      EventPass
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SaaS Platform</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0 glass-button"
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                className="p-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search events..."
                    className="pl-10 glass-input"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto px-3 py-2">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => router.push(item.href)}
                      className={cn(
                        "w-full justify-start h-12 glass-button transition-all duration-200",
                        isActive && "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
                        isCollapsed ? "px-2" : "px-3"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-3")} />
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.div
                            className="flex items-center justify-between w-full"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="font-medium">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/20">
                                {item.badge}
                              </Badge>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-gray-200/50 dark:border-gray-800/50 p-3">
            {/* Notifications */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  className="mb-3 p-3 glass-card rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Bell className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">Notifications</span>
                    <Badge variant="destructive" className="text-xs">3</Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    New check-ins for Tech Conference
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Navigation */}
            <div className="space-y-1">
              {bottomNavigationItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => router.push(item.href)}
                    className={cn(
                      "w-full justify-start h-10 glass-button",
                      isCollapsed ? "px-2" : "px-3"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-3")} />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          className="font-medium"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              ))}

              {/* Logout */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => router.push('/auth/login')}
                  className={cn(
                    "w-full justify-start h-10 glass-button text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20",
                    isCollapsed ? "px-2" : "px-3"
                  )}
                >
                  <LogOut className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-3")} />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        className="font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        Logout
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}