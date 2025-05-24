"use client"

import { useState } from "react"
import {
  Server,
  Cloud,
  Database,
  HardDrive,
  Network,
  RefreshCw,
  Shield,
  Cpu,
  MemoryStickIcon as Memory,
  Layers,
  Globe,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample infrastructure nodes
const infrastructureNodes = [
  {
    id: "node-1",
    name: "Web Server 1",
    type: "server",
    status: "healthy",
    region: "us-east-1",
    cpu: 45,
    memory: 60,
    disk: 35,
  },
  {
    id: "node-2",
    name: "Web Server 2",
    type: "server",
    status: "healthy",
    region: "us-east-1",
    cpu: 55,
    memory: 70,
    disk: 40,
  },
  {
    id: "node-3",
    name: "API Server 1",
    type: "server",
    status: "warning",
    region: "us-east-1",
    cpu: 75,
    memory: 80,
    disk: 50,
  },
  {
    id: "node-4",
    name: "API Server 2",
    type: "server",
    status: "healthy",
    region: "us-west-1",
    cpu: 35,
    memory: 50,
    disk: 30,
  },
  {
    id: "node-5",
    name: "Database Primary",
    type: "database",
    status: "healthy",
    region: "us-east-1",
    cpu: 65,
    memory: 75,
    disk: 60,
  },
  {
    id: "node-6",
    name: "Database Replica 1",
    type: "database",
    status: "healthy",
    region: "us-east-1",
    cpu: 40,
    memory: 55,
    disk: 45,
  },
  {
    id: "node-7",
    name: "Database Replica 2",
    type: "database",
    status: "critical",
    region: "us-west-1",
    cpu: 90,
    memory: 95,
    disk: 85,
  },
  {
    id: "node-8",
    name: "Cache Server 1",
    type: "cache",
    status: "healthy",
    region: "us-east-1",
    cpu: 30,
    memory: 85,
    disk: 20,
  },
  {
    id: "node-9",
    name: "Cache Server 2",
    type: "cache",
    status: "healthy",
    region: "us-west-1",
    cpu: 25,
    memory: 80,
    disk: 15,
  },
  {
    id: "node-10",
    name: "Storage Node 1",
    type: "storage",
    status: "healthy",
    region: "us-east-1",
    cpu: 20,
    memory: 40,
    disk: 75,
  },
  {
    id: "node-11",
    name: "Storage Node 2",
    type: "storage",
    status: "warning",
    region: "us-east-1",
    cpu: 25,
    memory: 45,
    disk: 85,
  },
  {
    id: "node-12",
    name: "Load Balancer 1",
    type: "network",
    status: "healthy",
    region: "us-east-1",
    cpu: 50,
    memory: 60,
    disk: 30,
  },
  {
    id: "node-13",
    name: "Load Balancer 2",
    type: "network",
    status: "healthy",
    region: "us-west-1",
    cpu: 45,
    memory: 55,
    disk: 25,
  },
  {
    id: "node-14",
    name: "Monitoring Server",
    type: "monitoring",
    status: "healthy",
    region: "us-east-1",
    cpu: 60,
    memory: 70,
    disk: 50,
  },
  {
    id: "node-15",
    name: "Backup Server",
    type: "backup",
    status: "healthy",
    region: "us-west-1",
    cpu: 15,
    memory: 30,
    disk: 90,
  },
]

// Function to get node icon
function getNodeIcon(type: string) {
  switch (type) {
    case "server":
      return <Server className="h-10 w-10 text-primary" />
    case "database":
      return <Database className="h-10 w-10 text-violet-500" />
    case "cache":
      return <Memory className="h-10 w-10 text-blue-500" />
    case "storage":
      return <HardDrive className="h-10 w-10 text-amber-500" />
    case "network":
      return <Network className="h-10 w-10 text-green-500" />
    case "monitoring":
      return <Cpu className="h-10 w-10 text-red-500" />
    case "backup":
      return <Layers className="h-10 w-10 text-teal-500" />
    default:
      return <Server className="h-10 w-10 text-primary" />
  }
}

// Function to get status icon
function getStatusIcon(status: string) {
  switch (status) {
    case "healthy":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    case "critical":
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <Info className="h-5 w-5 text-blue-500" />
  }
}

// Function to get status color
function getStatusColor(status: string) {
  switch (status) {
    case "healthy":
      return "bg-green-500"
    case "warning":
      return "bg-yellow-500"
    case "critical":
      return "bg-red-500"
    default:
      return "bg-blue-500"
  }
}

export function InfrastructureDashboard() {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedNode, setSelectedNode] = useState<(typeof infrastructureNodes)[0] | null>(null)

  // Filter nodes based on selected region and type
  const filteredNodes = infrastructureNodes.filter((node) => {
    const matchesRegion = selectedRegion === "all" || node.region === selectedRegion
    const matchesType = selectedType === "all" || node.type === selectedType
    return matchesRegion && matchesType
  })

  // Get unique regions and types for filters
  const regions = Array.from(new Set(infrastructureNodes.map((node) => node.region)))
  const types = Array.from(new Set(infrastructureNodes.map((node) => node.type)))

  // Count nodes by status
  const healthyNodes = infrastructureNodes.filter((node) => node.status === "healthy").length
  const warningNodes = infrastructureNodes.filter((node) => node.status === "warning").length
  const criticalNodes = infrastructureNodes.filter((node) => node.status === "critical").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Infrastructure</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </Button>
          <Button variant="outline" size="sm">
            <Cloud className="mr-2 h-4 w-4" />
            Cloud
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Nodes</CardTitle>
            <Server className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{infrastructureNodes.length}</div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col items-center">
                <Badge className="bg-green-500 mb-1 w-full justify-center">{healthyNodes}</Badge>
                <span className="text-muted-foreground">Healthy</span>
              </div>
              <div className="flex flex-col items-center">
                <Badge className="bg-yellow-500 mb-1 w-full justify-center">{warningNodes}</Badge>
                <span className="text-muted-foreground">Warning</span>
              </div>
              <div className="flex flex-col items-center">
                <Badge className="bg-red-500 mb-1 w-full justify-center">{criticalNodes}</Badge>
                <span className="text-muted-foreground">Critical</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Regions</CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regions.length}</div>
            <div className="mt-4 space-y-2">
              {regions.map((region) => {
                const regionNodes = infrastructureNodes.filter((node) => node.region === region)
                const healthyCount = regionNodes.filter((node) => node.status === "healthy").length
                const percentage = (healthyCount / regionNodes.length) * 100

                return (
                  <div key={region} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{region}</span>
                      <span>{regionNodes.length} nodes</span>
                    </div>
                    <Progress value={percentage} className="h-1" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resource Usage</CardTitle>
            <Cpu className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">CPU</span>
                  <span>45% avg.</span>
                </div>
                <Progress value={45} className="h-1" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Memory</span>
                  <span>60% avg.</span>
                </div>
                <Progress value={60} className="h-1" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Disk</span>
                  <span>50% avg.</span>
                </div>
                <Progress value={50} className="h-1" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Network</span>
                  <span>35% avg.</span>
                </div>
                <Progress value={35} className="h-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNodes.map((node) => (
              <Card
                key={node.id}
                className={`card-hover-effect cursor-pointer transition-all ${
                  selectedNode?.id === node.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedNode(node)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(node.status)}`}></div>
                      <CardTitle className="text-sm font-medium">{node.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {node.region}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-4">{getNodeIcon(node.type)}</div>
                  <div className="space-y-2 mt-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>CPU</span>
                        <span>{node.cpu}%</span>
                      </div>
                      <Progress
                        value={node.cpu}
                        className={`h-1 ${
                          node.cpu > 80 ? "bg-red-500" : node.cpu > 60 ? "bg-yellow-500" : "bg-green-500"
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Memory</span>
                        <span>{node.memory}%</span>
                      </div>
                      <Progress
                        value={node.memory}
                        className={`h-1 ${
                          node.memory > 80 ? "bg-red-500" : node.memory > 60 ? "bg-yellow-500" : "bg-green-500"
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Disk</span>
                        <span>{node.disk}%</span>
                      </div>
                      <Progress
                        value={node.disk}
                        className={`h-1 ${
                          node.disk > 80 ? "bg-red-500" : node.disk > 60 ? "bg-yellow-500" : "bg-green-500"
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Map</CardTitle>
              <CardDescription>Visual representation of your infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-[600px] w-full rounded-md border border-border bg-secondary/20 p-4">
                <div className="absolute top-4 left-4 p-4 bg-background/80 backdrop-blur-sm rounded-md border border-border">
                  <h3 className="text-sm font-medium mb-2">Regions</h3>
                  <div className="space-y-2">
                    {regions.map((region) => (
                      <div key={region} className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-xs">{region}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 right-4 p-4 bg-background/80 backdrop-blur-sm rounded-md border border-border">
                  <h3 className="text-sm font-medium mb-2">Node Types</h3>
                  <div className="space-y-2">
                    {types.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-xs">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <Globe className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p>Interactive infrastructure map visualization</p>
                    <p className="text-sm">
                      Showing {filteredNodes.length} nodes across {regions.length} regions
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedNode && (
        <Card className="card-hover-effect">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                {getStatusIcon(selectedNode.status)}
                <span className="ml-2">{selectedNode.name}</span>
              </CardTitle>
              <Badge variant="outline">{selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}</Badge>
            </div>
            <CardDescription>Region: {selectedNode.region}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Resource Usage</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>CPU Usage</span>
                        <span
                          className={`${
                            selectedNode.cpu > 80
                              ? "text-red-500"
                              : selectedNode.cpu > 60
                                ? "text-yellow-500"
                                : "text-green-500"
                          }`}
                        >
                          {selectedNode.cpu}%
                        </span>
                      </div>
                      <Progress
                        value={selectedNode.cpu}
                        className={`h-2 ${
                          selectedNode.cpu > 80
                            ? "bg-red-500"
                            : selectedNode.cpu > 60
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Memory Usage</span>
                        <span
                          className={`${
                            selectedNode.memory > 80
                              ? "text-red-500"
                              : selectedNode.memory > 60
                                ? "text-yellow-500"
                                : "text-green-500"
                          }`}
                        >
                          {selectedNode.memory}%
                        </span>
                      </div>
                      <Progress
                        value={selectedNode.memory}
                        className={`h-2 ${
                          selectedNode.memory > 80
                            ? "bg-red-500"
                            : selectedNode.memory > 60
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Disk Usage</span>
                        <span
                          className={`${
                            selectedNode.disk > 80
                              ? "text-red-500"
                              : selectedNode.disk > 60
                                ? "text-yellow-500"
                                : "text-green-500"
                          }`}
                        >
                          {selectedNode.disk}%
                        </span>
                      </div>
                      <Progress
                        value={selectedNode.disk}
                        className={`h-2 ${
                          selectedNode.disk > 80
                            ? "bg-red-500"
                            : selectedNode.disk > 60
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Network</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border border-border p-3">
                      <div className="text-xs text-muted-foreground mb-1">Inbound</div>
                      <div className="text-lg font-medium">45 Mbps</div>
                    </div>
                    <div className="rounded-md border border-border p-3">
                      <div className="text-xs text-muted-foreground mb-1">Outbound</div>
                      <div className="text-lg font-medium">32 Mbps</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Status History</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-md border border-border p-2">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Healthy</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Now</span>
                    </div>
                    <div className="flex items-center justify-between rounded-md border border-border p-2">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-sm">Warning</span>
                      </div>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between rounded-md border border-border p-2">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Healthy</span>
                      </div>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Restart
                    </Button>
                    <Button variant="outline" size="sm">
                      SSH
                    </Button>
                    <Button variant="outline" size="sm">
                      Logs
                    </Button>
                    <Button variant="outline" size="sm">
                      Metrics
                    </Button>
                    <Button variant="destructive" size="sm">
                      Stop
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
