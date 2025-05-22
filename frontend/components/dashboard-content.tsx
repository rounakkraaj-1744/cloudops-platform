"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Activity,
  Bell,
  ChevronDown,
  Database,
  GitBranch,
  Home,
  Layers,
  LogOut,
  Menu,
  Search,
  Server,
  Settings,
  User,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"

const navigationItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Monitoring",
    href: "/dashboard/monitoring",
    icon: Activity,
  },
  {
    name: "Logs",
    href: "/dashboard/logs",
    icon: Layers,
  },
  {
    name: "CI/CD",
    href: "/dashboard/ci-cd",
    icon: GitBranch,
  },
  {
    name: "Infrastructure",
    href: "/dashboard/infrastructure",
    icon: Server,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [notifications, setNotifications] = useState(3)
  const { toggleSidebar, setOpen, setOpenMobile, isMobile } = useSidebar()

  // Close sidebar after navigation
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false)
    } else {
      // Only close on mobile, keep desktop sidebar open
      // If you want it to close on desktop too, uncomment the next line
      // setOpen(false)
    }
  }, [pathname, setOpen, setOpenMobile, isMobile])

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar variant="inset" className="border-r border-border/30">
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-blue text-white">
                <Database className="h-4 w-4" />
              </div>
              <div className="font-semibold">CloudOps</div>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => toggleSidebar()}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                    <Link
                      href={item.href}
                      className={`transition-all duration-200 ${
                        isActive ? "text-accent-blue" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
            <div>v1.0.0</div>
            <div>© 2025</div>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <div className="flex flex-1 flex-col overflow-hidden w-full">
        <header className="glass sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/30 px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => toggleSidebar()}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-64 rounded-full border-none bg-secondary/50 pl-10 focus-visible:ring-accent-blue"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Button variant="ghost" size="icon" className="relative" onClick={() => setNotifications(0)}>
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-red p-0 text-xs"
                  variant="destructive"
                >
                  {notifications}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="hidden md:inline">John Doe</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 w-full overflow-auto bg-gradient-to-br from-background to-background/95 p-0">
          {children}
        </main>
      </div>
    </div>
  )
}
