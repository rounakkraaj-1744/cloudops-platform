"use client"

import { useState, useEffect } from "react"
import { Activity, AlertCircle, CheckCircle2, Clock, CloudCog, Database, Server, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "@/components/ui/chart"

export function DashboardPage() {
  const [cpuUsage, setCpuUsage] = useState(68)
  const [memoryUsage, setMemoryUsage] = useState(42)
  const [diskUsage, setDiskUsage] = useState(56)
  const [networkUsage, setNetworkUsage] = useState(35)

  // Simulate changing metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 50) // 50-80%
      setMemoryUsage(Math.floor(Math.random() * 20) + 35) // 35-55%
      setDiskUsage(Math.floor(Math.random() * 10) + 50) // 50-60%
      setNetworkUsage(Math.floor(Math.random() * 20) + 25) // 25-45%
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const cpuData = {
    labels: ["12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30"],
    datasets: [
      {
        label: "CPU Usage",
        data: [65, 59, 80, 81, 56, 55, cpuUsage],
        borderColor: "hsl(var(--accent-blue))",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const memoryData = {
    labels: ["12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30"],
    datasets: [
      {
        label: "Memory Usage",
        data: [40, 45, 50, 48, 42, 39, memoryUsage],
        borderColor: "hsl(var(--accent-purple))",
        backgroundColor: "rgba(147, 51, 234, 0.1)",
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="space-y-6 p-6 w-full">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your infrastructure and system health</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 24 hours
          </Button>
          <Button variant="default" size="sm" className="bg-accent-blue">
            <CloudCog className="mr-2 h-4 w-4" />
            Manage Resources
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cluster Health</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-accent-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.3%</div>
            <p className="text-xs text-muted-foreground">Healthy across all regions</p>
            <div className="mt-4">
              <Progress value={98} className="h-2 bg-secondary/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Activity className="h-4 w-4 text-accent-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.99%</div>
            <p className="text-xs text-muted-foreground">30 days without incidents</p>
            <div className="mt-4">
              <Progress value={99.99} className="h-2 bg-secondary/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-accent-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 critical, 1 warning</p>
            <div className="mt-4 flex gap-2">
              <Badge variant="destructive" className="bg-accent-red">
                Critical
              </Badge>
              <Badge variant="outline" className="text-accent-yellow">
                Warning
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resource Usage</CardTitle>
            <Database className="h-4 w-4 text-accent-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cpuUsage}%</div>
            <p className="text-xs text-muted-foreground">Across all instances</p>
            <div className="mt-4">
              <Progress value={cpuUsage} className="h-2 bg-secondary/50"/>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7 w-full">
        <Card className="glass md:col-span-5">
          <CardHeader>
            <CardTitle>System Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cpu">
              <TabsList className="mb-4">
                <TabsTrigger value="cpu">CPU</TabsTrigger>
                <TabsTrigger value="memory">Memory</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
                <TabsTrigger value="disk">Disk</TabsTrigger>
              </TabsList>
              <TabsContent value="cpu" className="h-[300px]">
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
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </TabsContent>
              <TabsContent value="memory" className="h-[300px]">
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
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </TabsContent>
              <TabsContent value="network">
                <div className="flex h-[300px] items-center justify-center">Network metrics visualization</div>
              </TabsContent>
              <TabsContent value="disk">
                <div className="flex h-[300px] items-center justify-center">Disk usage visualization</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="glass md:col-span-2">
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-accent-blue" />
                  CPU
                </div>
                <div>{cpuUsage}%</div>
              </div>
              <Progress value={cpuUsage} className="h-2 bg-secondary/50" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-accent-purple" />
                  Memory
                </div>
                <div>{memoryUsage}%</div>
              </div>
              <Progress value={memoryUsage} className="h-2 bg-secondary/50"/>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-accent-green" />
                  Disk
                </div>
                <div>{diskUsage}%</div>
              </div>
              <Progress value={diskUsage} className="h-2 bg-secondary/50"/>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-accent-yellow" />
                  Network
                </div>
                <div>{networkUsage}%</div>
              </div>
              <Progress value={networkUsage} className="h-2 bg-secondary/50"/>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Recent Deployments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "api-service",
                  status: "success",
                  time: "10 minutes ago",
                  env: "production",
                },
                {
                  name: "web-frontend",
                  status: "success",
                  time: "25 minutes ago",
                  env: "staging",
                },
                {
                  name: "auth-service",
                  status: "failed",
                  time: "1 hour ago",
                  env: "development",
                },
                {
                  name: "database-migration",
                  status: "in-progress",
                  time: "Just now",
                  env: "production",
                },
              ].map((deployment) => (
                <div
                  key={deployment.name}
                  className="flex items-center justify-between rounded-md border border-border/30 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        deployment.status === "success"
                          ? "bg-accent-green/20 text-accent-green"
                          : deployment.status === "failed"
                            ? "bg-accent-red/20 text-accent-red"
                            : "bg-accent-yellow/20 text-accent-yellow"
                      }`}
                    >
                      {deployment.status === "success" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : deployment.status === "failed" ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{deployment.name}</div>
                      <div className="text-xs text-muted-foreground">{deployment.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        deployment.env === "production"
                          ? "border-accent-blue text-accent-blue"
                          : deployment.env === "staging"
                            ? "border-accent-purple text-accent-purple"
                            : "border-accent-green text-accent-green"
                      }
                    >
                      {deployment.env}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Server className="h-4 w-4" />
                    </Button>
                  </div>
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
                      {alert.severity === "critical" ? (
                        <ShieldAlert className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
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