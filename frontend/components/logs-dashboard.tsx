"use client"

import { useState } from "react"
import {
  FileText,
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  Info,
  XCircle,
  CheckCircle2,
  Clock,
  Download,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample log data
const logs = [
  {
    id: "log-001",
    timestamp: "2025-05-22T09:45:23Z",
    level: "ERROR",
    service: "payment-service",
    message: "Failed to process payment transaction: Connection timeout",
    details: "Error connecting to payment gateway. Timeout after 30s. Transaction ID: TX-9384-ABCD",
  },
  {
    id: "log-002",
    timestamp: "2025-05-22T09:43:12Z",
    level: "WARN",
    service: "auth-service",
    message: "Multiple failed login attempts detected for user: john.doe@example.com",
    details: "5 failed attempts in the last 10 minutes. IP: 192.168.1.105",
  },
  {
    id: "log-003",
    timestamp: "2025-05-22T09:40:56Z",
    level: "INFO",
    service: "user-service",
    message: "User profile updated successfully",
    details: "User ID: 12345, Fields changed: email, phone",
  },
  {
    id: "log-004",
    timestamp: "2025-05-22T09:38:45Z",
    level: "DEBUG",
    service: "api-gateway",
    message: "Request processed in 235ms",
    details: "Endpoint: /api/v1/users, Method: GET, Status: 200",
  },
  {
    id: "log-005",
    timestamp: "2025-05-22T09:35:30Z",
    level: "ERROR",
    service: "database-service",
    message: "Database query failed: Syntax error in SQL statement",
    details: "Query: SELECT * FROM users WHERE email = 'john.doe@example.com' LIMIT;",
  },
  {
    id: "log-006",
    timestamp: "2025-05-22T09:32:18Z",
    level: "INFO",
    service: "notification-service",
    message: "Email notification sent successfully",
    details: "Template: password_reset, Recipient: jane.smith@example.com",
  },
  {
    id: "log-007",
    timestamp: "2025-05-22T09:30:05Z",
    level: "WARN",
    service: "storage-service",
    message: "Storage capacity reaching threshold",
    details: "Current usage: 85%, Threshold: 80%, Node: storage-node-02",
  },
  {
    id: "log-008",
    timestamp: "2025-05-22T09:28:42Z",
    level: "INFO",
    service: "auth-service",
    message: "New user registered",
    details: "User ID: 12346, Email: new.user@example.com, Registration source: web",
  },
  {
    id: "log-009",
    timestamp: "2025-05-22T09:25:30Z",
    level: "DEBUG",
    service: "api-gateway",
    message: "Rate limiting applied to client",
    details: "Client ID: client-8765, Current rate: 120 req/min, Limit: 100 req/min",
  },
  {
    id: "log-010",
    timestamp: "2025-05-22T09:22:15Z",
    level: "ERROR",
    service: "payment-service",
    message: "Invalid payment amount: Amount cannot be negative",
    details: "Transaction ID: TX-9385-EFGH, Amount: -50.00, Currency: USD",
  },
]

// Function to format timestamp
function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}

// Function to get badge variant based on log level
function getBadgeVariant(level: string) {
  switch (level) {
    case "ERROR":
      return "destructive"
    case "WARN":
      return "default" // This will use the yellow color
    case "INFO":
      return "secondary"
    case "DEBUG":
      return "outline"
    default:
      return "secondary"
  }
}

// Function to get icon based on log level
function getLevelIcon(level: string) {
  switch (level) {
    case "ERROR":
      return <XCircle className="h-4 w-4" />
    case "WARN":
      return <AlertTriangle className="h-4 w-4" />
    case "INFO":
      return <Info className="h-4 w-4" />
    case "DEBUG":
      return <CheckCircle2 className="h-4 w-4" />
    default:
      return <Info className="h-4 w-4" />
  }
}

export function LogsDashboard() {
  const [selectedLog, setSelectedLog] = useState<(typeof logs)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")

  // Filter logs based on search query and filters
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesService = serviceFilter === "all" || log.service === serviceFilter

    return matchesSearch && matchesLevel && matchesService
  })

  // Get unique services for filter dropdown
  const services = Array.from(new Set(logs.map((log) => log.service)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Logs Explorer</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Live Tail
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <div className="w-40">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Log Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="ERROR">Error</SelectItem>
                <SelectItem value="WARN">Warning</SelectItem>
                <SelectItem value="INFO">Info</SelectItem>
                <SelectItem value="DEBUG">Debug</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-40">
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 card-hover-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Log Stream
            </CardTitle>
            <CardDescription>
              Showing {filteredLogs.length} of {logs.length} logs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedLog?.id === log.id ? "bg-secondary border border-primary/30" : "hover:bg-secondary/50"
                  }`}
                  onClick={() => setSelectedLog(log)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getBadgeVariant(log.level) as any} className="flex items-center space-x-1">
                        {getLevelIcon(log.level)}
                        <span>{log.level}</span>
                      </Badge>
                      <span className="text-sm font-medium">{log.service}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatTimestamp(log.timestamp)}</span>
                  </div>
                  <p className="text-sm">{log.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="mr-2 h-5 w-5 text-primary" />
              Log Details
            </CardTitle>
            <CardDescription>
              {selectedLog ? `Log ID: ${selectedLog.id}` : "Select a log to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedLog ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Timestamp</h3>
                  <p className="text-sm">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Level</h3>
                  <Badge variant={getBadgeVariant(selectedLog.level) as any} className="flex items-center space-x-1">
                    {getLevelIcon(selectedLog.level)}
                    <span>{selectedLog.level}</span>
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Service</h3>
                  <p className="text-sm">{selectedLog.service}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Message</h3>
                  <p className="text-sm">{selectedLog.message}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Details</h3>
                  <div className="text-sm p-3 bg-secondary/50 rounded-md font-mono text-xs whitespace-pre-wrap">
                    {selectedLog.details}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
                <FileText className="h-12 w-12 mb-4 opacity-20" />
                <p>Select a log entry to view its details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
