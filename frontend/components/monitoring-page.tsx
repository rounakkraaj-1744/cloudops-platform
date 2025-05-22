"use client"

import { useState } from "react"
import { Activity, AlertCircle, ArrowDown, ArrowUp, Clock, Download, Filter, RefreshCw, Server } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart } from "@/components/ui/chart"

export function MonitoringPage() {
  const [timeRange, setTimeRange] = useState("24h")
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const cpuData = {
    labels: [
      "00:00",
      "02:00",
      "04:00",
      "06:00",
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
      "22:00",
    ],
    datasets: [
      {
        label: "API Server",
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 68],
        borderColor: "hsl(var(--accent-blue))",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
      {
        label: "Database",
        data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56],
        borderColor: "hsl(var(--accent-purple))",
        backgroundColor: "rgba(147, 51, 234, 0.1)",
        tension: 0.3,
      },
      {
        label: "Cache",
        data: [45, 25, 16, 36, 67, 18, 76, 90, 65, 59, 40, 45],
        borderColor: "hsl(var(--accent-green))",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const memoryData = {
    labels: [
      "00:00",
      "02:00",
      "04:00",
      "06:00",
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
      "22:00",
    ],
    datasets: [
      {
        label: "API Server",
        data: [40, 45, 50, 48, 42, 39, 35, 40, 45, 50, 55, 60],
        borderColor: "hsl(var(--accent-blue))",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
      {
        label: "Database",
        data: [60, 65, 70, 75, 80, 85, 80, 75, 70, 65, 60, 55],
        borderColor: "hsl(var(--accent-purple))",
        backgroundColor: "rgba(147, 51, 234, 0.1)",
        tension: 0.3,
      },
      {
        label: "Cache",
        data: [20, 25, 30, 35, 30, 25, 20, 25, 30, 35, 30, 25],
        borderColor: "hsl(var(--accent-green))",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="space-y-6 p-6 w-full">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Monitoring</h1>
          <p className="text-muted-foreground">Real-time metrics and system performance</p>
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

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Activity className="h-4 w-4 text-accent-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <div className="flex items-center text-xs text-accent-green">
              <ArrowDown className="mr-1 h-3 w-3" />
              12% from average
            </div>
            <div className="mt-4">
              <Progress value={68} className="h-2 bg-secondary/50"/>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <Server className="h-4 w-4 text-accent-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <div className="flex items-center text-xs text-accent-green">
              <ArrowDown className="mr-1 h-3 w-3" />
              8% from average
            </div>
            <div className="mt-4">
              <Progress value={42} className="h-2 bg-secondary/50"/>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Disk I/O</CardTitle>
            <Activity className="h-4 w-4 text-accent-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125 MB/s</div>
            <div className="flex items-center text-xs text-accent-red">
              <ArrowUp className="mr-1 h-3 w-3" />
              15% from average
            </div>
            <div className="mt-4">
              <Progress value={65} className="h-2 bg-secondary/50"/>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Network</CardTitle>
            <Activity className="h-4 w-4 text-accent-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85 Mbps</div>
            <div className="flex items-center text-xs text-accent-red">
              <ArrowUp className="mr-1 h-3 w-3" />
              20% from average
            </div>
            <div className="mt-4">
              <Progress value={45} className="h-2 bg-secondary/50"/>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>System Metrics</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: Just now</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cpu">
            <TabsList className="mb-4">
              <TabsTrigger value="cpu">CPU</TabsTrigger>
              <TabsTrigger value="memory">Memory</TabsTrigger>
              <TabsTrigger value="disk">Disk</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
            </TabsList>
            <TabsContent value="cpu" className="h-[400px]">
              <LineChart
                data={cpuData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                      },
                    },
                    x: {
                      grid: {
                        color: "rgba(255, 255, 255, 0.05)",
                      },
                    },
                  },
                }}
              />
            </TabsContent>
            <TabsContent value="memory" className="h-[400px]">
              <LineChart
                data={memoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                      },
                    },
                    x: {
                      grid: {
                        color: "rgba(255, 255, 255, 0.05)",
                      },
                    },
                  },
                }}
              />
            </TabsContent>
            <TabsContent value="disk">
              <div className="flex h-[400px] items-center justify-center">Disk metrics visualization</div>
            </TabsContent>
            <TabsContent value="network">
              <div className="flex h-[400px] items-center justify-center">Network metrics visualization</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Service Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "API Gateway",
                  status: "healthy",
                  uptime: "30d 4h 12m",
                  instances: 3,
                },
                {
                  name: "Authentication Service",
                  status: "healthy",
                  uptime: "15d 7h 23m",
                  instances: 2,
                },
                {
                  name: "Database Cluster",
                  status: "degraded",
                  uptime: "7d 12h 5m",
                  instances: 3,
                },
                {
                  name: "Cache Service",
                  status: "healthy",
                  uptime: "30d 4h 12m",
                  instances: 2,
                },
                {
                  name: "Storage Service",
                  status: "critical",
                  uptime: "0d 4h 37m",
                  instances: 4,
                },
              ].map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between rounded-md border border-border/30 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        service.status === "healthy"
                          ? "bg-accent-green"
                          : service.status === "degraded"
                            ? "bg-accent-yellow"
                            : "bg-accent-red"
                      }`}
                    />
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {service.instances} instances • {service.uptime} uptime
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      service.status === "healthy"
                        ? "outline"
                        : service.status === "degraded"
                          ? "outline"
                          : "destructive"
                    }
                    className={
                      service.status === "healthy"
                        ? "border-accent-green text-accent-green"
                        : service.status === "degraded"
                          ? "border-accent-yellow text-accent-yellow"
                          : "bg-accent-red"
                    }
                  >
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "High CPU Usage",
                  description: "api-service-pod-3 exceeding threshold",
                  time: "10 minutes ago",
                  severity: "critical",
                },
                {
                  title: "Memory Leak Detected",
                  description: "web-frontend-pod-2 memory increasing",
                  time: "25 minutes ago",
                  severity: "warning",
                },
                {
                  title: "Database Connection Failures",
                  description: "auth-service unable to connect to DB",
                  time: "1 hour ago",
                  severity: "critical",
                },
                {
                  title: "Disk Space Low",
                  description: "storage-node-1 at 85% capacity",
                  time: "2 hours ago",
                  severity: "warning",
                },
                {
                  title: "Network Latency Spike",
                  description: "Between us-east and eu-west regions",
                  time: "3 hours ago",
                  severity: "warning",
                },
              ].map((alert) => (
                <div
                  key={alert.title}
                  className="flex items-center justify-between rounded-md border border-border/30 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        alert.severity === "critical"
                          ? "bg-accent-red/20 text-accent-red"
                          : "bg-accent-yellow/20 text-accent-yellow"
                      }`}
                    >
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-xs text-muted-foreground">{alert.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">{alert.time}</div>
                    <Badge
                      variant={alert.severity === "critical" ? "destructive" : "outline"}
                      className={
                        alert.severity === "critical" ? "bg-accent-red" : "border-accent-yellow text-accent-yellow"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
