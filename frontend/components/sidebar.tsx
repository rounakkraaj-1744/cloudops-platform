"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Activity, FileText, GitBranch, Server, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Monitoring", href: "/monitoring", icon: Activity },
  { name: "Logs", href: "/logs", icon: FileText },
  { name: "CI/CD", href: "/ci-cd", icon: GitBranch },
  { name: "Infrastructure", href: "/infrastructure", icon: Server },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <SidebarProvider defaultOpen={isOpen} open={isOpen} onOpenChange={setIsOpen}>
      <ShadcnSidebar className="border-r border-border/50 bg-card/95 backdrop-blur-md">
        <SidebarHeader className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Server className="h-5 w-5" />
            </div>
            <span className={cn("text-lg font-semibold transition-all", !isOpen && "opacity-0 translate-x-4")}>
              CloudOps
            </span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </SidebarHeader>
        <SidebarContent className="px-2 py-4">
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 transition-all",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      isActive && "glow-hover",
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                      <span className={cn("transition-all", !isOpen && "opacity-0")}>{item.name}</span>
                      {isActive && <div className="absolute left-0 h-full w-1 rounded-r-full bg-primary" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
      </ShadcnSidebar>
    </SidebarProvider>
  )
}
