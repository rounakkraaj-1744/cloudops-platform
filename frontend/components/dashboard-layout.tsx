"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Home, Activity, FileText, GitBranch, Server, Settings, LogOut, ChevronLeft } from "lucide-react"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Monitoring", path: "/monitoring", icon: Activity },
    { name: "Logs", path: "/logs", icon: FileText },
    { name: "CI/CD", path: "/ci-cd", icon: GitBranch },
    { name: "Infrastructure", path: "/infrastructure", icon: Server },
    { name: "Settings", path: "/settings", icon: Settings },
  ]

  return (
    <SidebarProvider defaultOpen={!collapsed}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="border-r border-border/40">
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Server className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">CloudOps</span>
            </div>
            <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded-md hover:bg-secondary">
              <ChevronLeft className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
            </button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={pathname === item.path} tooltip={item.name}>
                    <a href={item.path} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <button className="flex items-center text-muted-foreground hover:text-foreground">
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopNavbar />
          <main className="flex-1 overflow-auto p-6 page-transition">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
