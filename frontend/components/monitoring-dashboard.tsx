"use client"

import { Activity, Database, HardDrive, Network, RefreshCw, Cpu, MemoryStickIcon as Memory, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const cpuData = [
  { time: "00:00", value: 45, temp: 65 },
  { time: "01:00", value: 50, temp: 67 },
  { time: "02:00", value: 35, temp: 63 },
  { time: "03:00", value: 30, temp: 62 },
  { time: "04:00", value: 45, temp: 65 },
  { time: "05:00", value: 65, temp: 68 },
  { time: "06:00", value: 85, temp: 72 },
  { time: "07:00", value: 70, temp: 70 },
  { time: "08:00", value: 65, temp: 68 },
  { time: "09:00", value: 75, temp: 71 },
  { time: "10:00", value: 80, temp: 72 },
  { time: "11:00", value: 85, temp: 73 },
  { time: "12:00", value: 90, temp: 74 },
]

const networkData = [
  { time: "00:00", download: 25, upload: 10 },
  { time: "01:00", download: 30, upload: 15 },
  { time: "02:00", download: 20, upload: 8 },
  { time: "03:00", download: 15, upload: 5 },
  { time: "04:00", download: 25, upload: 12 },
  { time: "05:00", download: 35, upload: 18 },
  { time: "06:00", download: 45, upload: 25 },
  { time: "07:00", download: 40, upload: 20 },
  { time: "08:00", download: 35, upload: 15 },
  { time: "09:00", download: 45, upload: 22 },
  { time: "10:00", download: 50, upload: 28 },
  { time: "11:00", download: 55, upload: 30 },
  { time: "12:00", download: 60, upload: 35 },
]

const memoryData = [
  { time: "00:00", used: 60, cached: 15 },
  { time: "01:00", used: 65, cached: 18 },
  { time: "02:00", used: 55, cached: 12 },
  { time: "03:00", used: 50, cached: 10 },
  { time: "04:00", used: 60, cached: 15 },
  { time: "05:00", used: 70, cached: 20 },
  { time: "06:00", used: 80, cached: 25 },
  { time: "07:00", used: 75, cached: 22 },
  { time: "08:00", used: 70, cached: 20 },
  { time: "09:00", used: 75, cached: 22 },
  { time: "10:00", used: 80, cached: 25 },
  { time: "11:00", used: 85, cached: 28 },
  { time: "12:00", used: 90, cached: 30 },
]

const diskData = [
  { time: "00:00", read: 15, write: 8 },
  { time: "01:00", read: 20, write: 10 },
  { time: "02:00", read: 10, write: 5 },
  { time: "03:00", read: 5, write: 2 },
  { time: "04:00", read: 15, write: 8 },
  { time: "05:00", read: 25, write: 12 },
  { time: "06:00", read: 35, write: 18 },
  { time: "07:00", read: 30, write: 15 },
  { time: "08:00", read: 25, write: 12 },
  { time: "09:00", read: 30, write: 15 },
  { time: "10:00", read: 35, write: 18 },
  { time: "11:00", read: 40, write: 20 },
  { time: "12:00", read: 45, write: 22 },
]

export function MonitoringDashboard() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">System Monitoring</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Last 12 Hours
          </Button>
          <Button variant="outline" size="sm">
            Last 24 Hours
          </Button>
          <Button variant="outline" size="sm">
            Last 7 Days
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground">Across all cores</p>
            <div className="mt-4">
              <Progress value={78.5} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Memory</CardTitle>
            <Memory className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16.2 GB</div>
            <p className="text-xs text-muted-foreground">Of 32 GB (50.6%)</p>
            <div className="mt-4">
              <Progress value={50.6} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Disk I/O</CardTitle>
            <HardDrive className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 MB/s</div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Read: 30 MB/s</span>
              <span>Write: 15 MB/s</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Progress value={60} className="h-2" />
              <Progress value={30} className="h-2 bg-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Network</CardTitle>
            <Network className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85 Mbps</div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Down: 60 Mbps</span>
              <span>Up: 25 Mbps</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Progress value={60} className="h-2" />
              <Progress value={25} className="h-2 bg-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cpu" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cpu" className="flex items-center">
            <Cpu className="mr-2 h-4 w-4" />
            CPU
          </TabsTrigger>
          <TabsTrigger value="memory" className="flex items-center">
            <Memory className="mr-2 h-4 w-4" />
            Memory
          </TabsTrigger>
          <TabsTrigger value="disk" className="flex items-center">
            <HardDrive className="mr-2 h-4 w-4" />
            Disk
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center">
            <Network className="mr-2 h-4 w-4" />
            Network
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cpu" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-primary" />
                CPU Performance
              </CardTitle>
              <CardDescription>CPU utilization and temperature over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cpuData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="time" stroke="#888888" />
                    <YAxis yAxisId="left" stroke="#888888" />
                    <YAxis yAxisId="right" orientation="right" stroke="#888888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17, 25, 40, 0.9)",
                        borderColor: "#444",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="value"
                      name="CPU Usage (%)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="temp"
                      name="Temperature (°C)"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memory" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Memory className="mr-2 h-5 w-5 text-primary" />
                Memory Usage
              </CardTitle>
              <CardDescription>Memory utilization and cache over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={memoryData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }} stackOffset="none">
                    <defs>
                      <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCached" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="time" stroke="#888888" />
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
                    <Area
                      type="monotone"
                      dataKey="used"
                      name="Used Memory (%)"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#colorUsed)"
                      stackId="1"
                    />
                    <Area
                      type="monotone"
                      dataKey="cached"
                      name="Cached Memory (%)"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorCached)"
                      stackId="1"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disk" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="mr-2 h-5 w-5 text-primary" />
                Disk I/O
              </CardTitle>
              <CardDescription>Disk read and write operations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={diskData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <defs>
                      <linearGradient id="colorRead" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorWrite" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="time" stroke="#888888" />
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
                    <Area
                      type="monotone"
                      dataKey="read"
                      name="Read (MB/s)"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorRead)"
                    />
                    <Area
                      type="monotone"
                      dataKey="write"
                      name="Write (MB/s)"
                      stroke="#f59e0b"
                      fillOpacity={1}
                      fill="url(#colorWrite)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Network className="mr-2 h-5 w-5 text-primary" />
                Network Traffic
              </CardTitle>
              <CardDescription>Network download and upload speeds over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={networkData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="time" stroke="#888888" />
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
                    <Line
                      type="monotone"
                      dataKey="download"
                      name="Download (Mbps)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="upload"
                      name="Upload (Mbps)"
                      stroke="#ec4899"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              System Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24d 13h 45m</div>
              <p className="text-sm text-muted-foreground">Last reboot: May 28, 2025 at 8:15 AM</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-primary" />
              Database Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Primary DB</span>
                </div>
                <span className="text-sm text-muted-foreground">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Replica 1</span>
                </div>
                <span className="text-sm text-muted-foreground">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Replica 2</span>
                </div>
                <span className="text-sm text-muted-foreground">High Latency</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Analytics DB</span>
                </div>
                <span className="text-sm text-muted-foreground">Healthy</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Service Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">API Gateway</span>
                </div>
                <span className="text-sm text-muted-foreground">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Auth Service</span>
                </div>
                <span className="text-sm text-muted-foreground">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">User Service</span>
                </div>
                <span className="text-sm text-muted-foreground">99.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">Payment Service</span>
                </div>
                <span className="text-sm text-muted-foreground">87.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
