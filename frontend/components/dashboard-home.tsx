"use client"

import {
  ArrowUpRight,
  ArrowDownRight,
  Server,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Activity,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"

const cpuData = [
  { time: "00:00", value: 45 },
  { time: "04:00", value: 30 },
  { time: "08:00", value: 65 },
  { time: "12:00", value: 85 },
  { time: "16:00", value: 70 },
  { time: "20:00", value: 55 },
  { time: "24:00", value: 40 },
]

const memoryData = [
  { time: "00:00", value: 60 },
  { time: "04:00", value: 55 },
  { time: "08:00", value: 70 },
  { time: "12:00", value: 75 },
  { time: "16:00", value: 80 },
  { time: "20:00", value: 65 },
  { time: "24:00", value: 50 },
]

const alertsData = [
  { name: "Critical", value: 3 },
  { name: "Warning", value: 7 },
  { name: "Info", value: 12 },
]

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Last 24 Hours
          </Button>
          <Button variant="outline" size="sm">
            Last 7 Days
          </Button>
          <Button variant="outline" size="sm">
            Last 30 Days
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cluster Health</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-muted-foreground">Healthy across all regions</p>
            <div className="mt-4">
              <Progress value={98.7} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.99%</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+0.1% from last month</span>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">Last downtime: 3 days ago (2m)</div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <div className="flex items-center pt-1">
              <ArrowDownRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">-4 from yesterday</span>
            </div>
            <div className="mt-4 flex space-x-2">
              <Badge variant="destructive" className="text-xs">
                3 Critical
              </Badge>
              <Badge variant="default" className="bg-yellow-500 text-xs">
                7 Warning
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Nodes</CardTitle>
            <Server className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/24</div>
            <p className="text-xs text-muted-foreground">All nodes operational</p>
            <div className="mt-4 grid grid-cols-8 gap-1">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="h-2 w-full rounded-full bg-green-500" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              CPU Utilization
            </CardTitle>
            <CardDescription>Average CPU usage across all clusters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cpuData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 25, 40, 0.9)",
                      borderColor: "#444",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Memory Usage
            </CardTitle>
            <CardDescription>Memory consumption across all services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={memoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 25, 40, 0.9)",
                      borderColor: "#444",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMemory)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 card-hover-effect">
          <CardHeader>
            <CardTitle>Alert Distribution</CardTitle>
            <CardDescription>Current alerts by severity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={alertsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 25, 40, 0.9)",
                      borderColor: "#444",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value" fill="#ef4444" name="Count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 card-hover-effect">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 rounded-md p-3 transition-all hover:bg-secondary">
                <div className="rounded-full p-1 bg-red-500/20">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">High CPU Usage</p>
                    <Badge variant="outline" className="text-xs">
                      Critical
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Server prod-api-03 CPU usage at 95% for over 10 minutes
                  </p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rounded-md p-3 transition-all hover:bg-secondary">
                <div className="rounded-full p-1 bg-yellow-500/20">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Memory Warning</p>
                    <Badge variant="outline" className="text-xs">
                      Warning
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Database cluster memory usage above 80%</p>
                  <p className="text-xs text-muted-foreground">43 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rounded-md p-3 transition-all hover:bg-secondary">
                <div className="rounded-full p-1 bg-green-500/20">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Alert Resolved</p>
                    <Badge variant="outline" className="text-xs">
                      Info
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Network latency returned to normal levels</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rounded-md p-3 transition-all hover:bg-secondary">
                <div className="rounded-full p-1 bg-yellow-500/20">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Disk Space Warning</p>
                    <Badge variant="outline" className="text-xs">
                      Warning
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Storage volume at 85% capacity on storage-node-02</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
