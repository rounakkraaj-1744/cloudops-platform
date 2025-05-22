"use client"

import { useState } from "react"
import { AlertCircle, ArrowDown, Check, ChevronDown, Clock, Download, Filter, RefreshCw, Search, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LogsPage() {
  const [timeRange, setTimeRange] = useState("24h")
  const [logLevel, setLogLevel] = useState("all")
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const logs = [
    {
      timestamp: "2025-05-22T16:45:12Z",
      level: "error",
      service: "auth-service",
      message: "Failed to connect to database: Connection refused (postgres:5432)",
      trace_id: "trace-1234-abcd-5678",
    },
    {
      timestamp: "2025-05-22T16:44:58Z",
      level: "warn",
      service: "api-gateway",
      message: "Rate limit exceeded for IP 192.168.1.105",
      trace_id: "trace-1234-abcd-5679",
    },
    {
      timestamp: "2025-05-22T16:44:45Z",
      level: "info",
      service: "user-service",
      message: "User profile updated successfully for user_id: 12345",
      trace_id: "trace-1234-abcd-5680",
    },
    {
      timestamp: "2025-05-22T16:44:30Z",
      level: "debug",
      service: "payment-service",
      message: "Processing payment request for order_id: ORD-9876-ABCD",
      trace_id: "trace-1234-abcd-5681",
    },
    {
      timestamp: "2025-05-22T16:44:15Z",
      level: "info",
      service: "notification-service",
      message: "Email notification sent to user@example.com",
      trace_id: "trace-1234-abcd-5682",
    },
    {
      timestamp: "2025-05-22T16:44:00Z",
      level: "error",
      service: "storage-service",
      message: "Failed to upload file: Permission denied",
      trace_id: "trace-1234-abcd-5683",
    },
    {
      timestamp: "2025-05-22T16:43:45Z",
      level: "warn",
      service: "cache-service",
      message: "Cache miss rate exceeding threshold (85%)",
      trace_id: "trace-1234-abcd-5684",
    },
    {
      timestamp: "2025-05-22T16:43:30Z",
      level: "info",
      service: "auth-service",
      message: "User login successful: user_id: 54321",
      trace_id: "trace-1234-abcd-5685",
    },
    {
      timestamp: "2025-05-22T16:43:15Z",
      level: "debug",
      service: "api-gateway",
      message: "Request forwarded to user-service: GET /users/profile/12345",
      trace_id: "trace-1234-abcd-5686",
    },
    {
      timestamp: "2025-05-22T16:43:00Z",
      level: "info",
      service: "payment-service",
      message: "Payment processed successfully for order_id: ORD-9876-EFGH",
      trace_id: "trace-1234-abcd-5687",
    },
  ]

  const filteredLogs = logLevel === "all" ? logs : logs.filter((log) => log.level === logLevel)

  const searchedLogs = searchQuery
    ? filteredLogs.filter(
        (log) =>
          log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.trace_id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredLogs

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString()
  }

  return (
    <div className="space-y-6 p-6 w-full">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Logs</h1>
          <p className="text-muted-foreground">System logs and application events</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="6h">Last 6 Hours</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="glass">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Log Stream</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="w-full pl-10 md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Select value={logLevel} onValueChange={setLogLevel}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Log Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warn">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Services
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Service</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4" />
                      <span>All Services</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="ml-6">auth-service</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="ml-6">api-gateway</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="ml-6">user-service</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="ml-6">payment-service</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="ml-6">notification-service</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 rounded-md border border-border/30 bg-background/50 p-1 font-mono text-sm">
            {searchedLogs.length > 0 ? (
              searchedLogs.map((log, index) => (
                <div key={index} className="flex flex-col gap-1 rounded-sm p-2 hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        log.level === "error"
                          ? "destructive"
                          : log.level === "warn"
                            ? "outline"
                            : log.level === "info"
                              ? "outline"
                              : "outline"
                      }
                      className={
                        log.level === "error"
                          ? "bg-accent-red"
                          : log.level === "warn"
                            ? "border-accent-yellow text-accent-yellow"
                            : log.level === "info"
                              ? "border-accent-blue text-accent-blue"
                              : "border-muted-foreground text-muted-foreground"
                      }
                    >
                      {log.level.toUpperCase()}
                    </Badge>
                    <span className="text-muted-foreground">{formatDate(log.timestamp)}</span>
                    <Badge variant="outline" className="border-accent-purple text-accent-purple">
                      {log.service}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{log.trace_id}</span>
                  </div>
                  <div className="pl-2">{log.message}</div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                No logs found matching your criteria
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ArrowDown className="h-4 w-4" />
              Auto-scrolling enabled
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Last updated: Just now</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Log Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border border-border/30 p-4">
                  <div className="text-sm text-muted-foreground">Total Logs</div>
                  <div className="text-2xl font-bold">12,543</div>
                </div>
                <div className="rounded-md border border-border/30 p-4">
                  <div className="text-sm text-muted-foreground">Error Rate</div>
                  <div className="text-2xl font-bold">2.4%</div>
                </div>
                <div className="rounded-md border border-border/30 p-4">
                  <div className="text-sm text-muted-foreground">Warnings</div>
                  <div className="text-2xl font-bold">156</div>
                </div>
                <div className="rounded-md border border-border/30 p-4">
                  <div className="text-sm text-muted-foreground">Services</div>
                  <div className="text-2xl font-bold">8</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Log Level Distribution</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-accent-red" />
                    <div className="flex-1 text-sm">Error</div>
                    <div className="text-sm">304 (2.4%)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-accent-yellow" />
                    <div className="flex-1 text-sm">Warning</div>
                    <div className="text-sm">156 (1.2%)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-accent-blue" />
                    <div className="flex-1 text-sm">Info</div>
                    <div className="text-sm">8,432 (67.2%)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                    <div className="flex-1 text-sm">Debug</div>
                    <div className="text-sm">3,651 (29.1%)</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Common Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  error: "Database Connection Failed",
                  count: 45,
                  service: "auth-service",
                  lastSeen: "10 minutes ago",
                },
                {
                  error: "API Rate Limit Exceeded",
                  count: 32,
                  service: "api-gateway",
                  lastSeen: "15 minutes ago",
                },
                {
                  error: "File Upload Permission Denied",
                  count: 28,
                  service: "storage-service",
                  lastSeen: "25 minutes ago",
                },
                {
                  error: "Payment Processing Failed",
                  count: 15,
                  service: "payment-service",
                  lastSeen: "1 hour ago",
                },
              ].map((error, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border border-border/30 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-red/20 text-accent-red">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{error.error}</div>
                      <div className="text-xs text-muted-foreground">
                        {error.service} • Last seen {error.lastSeen}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-accent-red text-accent-red">
                    {error.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
