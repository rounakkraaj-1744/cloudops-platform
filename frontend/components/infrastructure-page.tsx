"use client"

import { useState } from "react"
import {
  ArrowUp,
  Check,
  ChevronDown,
  Cloud,
  Database,
  Filter,
  HardDrive,
  Network,
  RefreshCw,
  Search,
  Server,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InfrastructurePage() {
  const [region, setRegion] = useState("all")
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const instances = [
    {
      id: "i-1234abcd",
      name: "api-server-1",
      type: "t3.large",
      status: "running",
      region: "us-east-1",
      zone: "us-east-1a",
      ip: "10.0.1.101",
      cpu: 45,
      memory: 62,
      disk: 38,
    },
    {
      id: "i-2345bcde",
      name: "api-server-2",
      type: "t3.large",
      status: "running",
      region: "us-east-1",
      zone: "us-east-1b",
      ip: "10.0.1.102",
      cpu: 38,
      memory: 55,
      disk: 42,
    },
    {
      id: "i-3456cdef",
      name: "db-primary",
      type: "r5.xlarge",
      status: "running",
      region: "us-east-1",
      zone: "us-east-1c",
      ip: "10.0.2.101",
      cpu: 72,
      memory: 85,
      disk: 65,
    },
    {
      id: "i-4567defg",
      name: "db-replica",
      type: "r5.xlarge",
      status: "running",
      region: "us-west-2",
      zone: "us-west-2a",
      ip: "10.0.3.101",
      cpu: 35,
      memory: 48,
      disk: 52,
    },
    {
      id: "i-5678efgh",
      name: "cache-1",
      type: "c5.large",
      status: "stopped",
      region: "us-east-1",
      zone: "us-east-1a",
      ip: "10.0.4.101",
      cpu: 0,
      memory: 0,
      disk: 12,
    },
    {
      id: "i-6789fghi",
      name: "worker-1",
      type: "c5.xlarge",
      status: "running",
      region: "eu-west-1",
      zone: "eu-west-1a",
      ip: "10.0.5.101",
      cpu: 88,
      memory: 72,
      disk: 45,
    },
    {
      id: "i-7890ghij",
      name: "worker-2",
      type: "c5.xlarge",
      status: "running",
      region: "eu-west-1",
      zone: "eu-west-1b",
      ip: "10.0.5.102",
      cpu: 76,
      memory: 68,
      disk: 41,
    },
  ]

  const databases = [
    {
      id: "db-1234",
      name: "main-postgres",
      type: "PostgreSQL",
      status: "available",
      size: "db.r5.large",
      storage: "500 GB",
      connections: 42,
      cpu: 65,
      memory: 78,
    },
    {
      id: "db-2345",
      name: "analytics-mysql",
      type: "MySQL",
      status: "available",
      size: "db.r5.xlarge",
      storage: "1 TB",
      connections: 18,
      cpu: 45,
      memory: 52,
    },
    {
      id: "db-3456",
      name: "cache-redis",
      type: "Redis",
      status: "available",
      size: "cache.m5.large",
      storage: "N/A",
      connections: 156,
      cpu: 32,
      memory: 48,
    },
    {
      id: "db-4567",
      name: "search-elastic",
      type: "Elasticsearch",
      status: "available",
      size: "m5.large.elasticsearch",
      storage: "200 GB",
      connections: 24,
      cpu: 58,
      memory: 72,
    },
    {
      id: "db-5678",
      name: "queue-mongo",
      type: "MongoDB",
      status: "maintenance",
      size: "db.r5.large",
      storage: "250 GB",
      connections: 0,
      cpu: 5,
      memory: 15,
    },
  ]

  const filteredInstances = region === "all" ? instances : instances.filter((instance) => instance.region === region)

  const searchedInstances = searchQuery
    ? filteredInstances.filter(
        (instance) =>
          instance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          instance.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          instance.ip.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredInstances

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
      case "available":
        return "bg-accent-green"
      case "stopped":
        return "bg-accent-yellow"
      case "maintenance":
        return "bg-accent-blue"
      default:
        return "bg-accent-red"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
      case "available":
        return (
          <Badge variant="outline" className="border-accent-green text-accent-green">
            {status}
          </Badge>
        )
      case "stopped":
        return (
          <Badge variant="outline" className="border-accent-yellow text-accent-yellow">
            {status}
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="outline" className="border-accent-yellow text-accent-yellow">
            {status}
          </Badge>
        )
      default:
        return (
          <Badge variant="destructive" className="bg-accent-red">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6 p-6 w-full">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Infrastructure</h1>
          <p className="text-muted-foreground">Cloud resources and infrastructure management</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
              <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
              <SelectItem value="eu-west-1">EU West (Ireland)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="default" size="sm" className="bg-accent-blue">
            <Cloud className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Instances</CardTitle>
            <Server className="h-4 w-4 text-accent-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="flex items-center text-xs text-accent-green">
              <ArrowUp className="mr-1 h-3 w-3" />2 from last month
            </div>
            <div className="mt-4 flex gap-2">
              <Badge variant="outline" className="border-accent-green text-accent-green">
                6 Running
              </Badge>
              <Badge variant="outline" className="border-accent-yellow text-accent-yellow">
                1 Stopped
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Databases</CardTitle>
            <Database className="h-4 w-4 text-accent-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex items-center text-xs text-muted-foreground">No change from last month</div>
            <div className="mt-4 flex gap-2">
              <Badge variant="outline" className="border-accent-green text-accent-green">
                4 Available
              </Badge>
              <Badge variant="outline" className="border-accent-yellow text-accent-yellow">
                1 Maintenance
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-accent-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1 TB</div>
            <div className="flex items-center text-xs text-accent-red">
              <ArrowUp className="mr-1 h-3 w-3" />
              300 GB from last month
            </div>
            <div className="mt-4">
              <Progress value={65} className="h-2 bg-secondary/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Network</CardTitle>
            <Network className="h-4 w-4 text-accent-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 VPCs</div>
            <div className="flex items-center text-xs text-muted-foreground">8 Subnets, 5 Security Groups</div>
            <div className="mt-4 flex gap-2">
              <Badge variant="outline" className="border-accent-blue text-accent-blue">
                12 TB Transfer
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="instances">
        <TabsList className="mb-4">
          <TabsTrigger value="instances">Instances</TabsTrigger>
          <TabsTrigger value="databases">Databases</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="instances">
          <Card className="glass">
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle>Compute Instances</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search instances..."
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Check className="mr-2 h-4 w-4" />
                        <span>All Statuses</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="ml-6">Running</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="ml-6">Stopped</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Region/Zone</TableHead>
                    <TableHead className="hidden md:table-cell">IP Address</TableHead>
                    <TableHead className="hidden md:table-cell">CPU</TableHead>
                    <TableHead className="hidden md:table-cell">Memory</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchedInstances.map((instance) => (
                    <TableRow key={instance.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${getStatusColor(instance.status)}`} />
                          <span className="hidden md:inline">{getStatusBadge(instance.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{instance.name}</div>
                        <div className="text-xs text-muted-foreground">{instance.id}</div>
                      </TableCell>
                      <TableCell>{instance.type}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>{instance.region}</div>
                        <div className="text-xs text-muted-foreground">{instance.zone}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{instance.ip}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={instance.cpu}
                            className="h-2 w-16 bg-secondary/50"
                          />
                          <span className="text-xs">{instance.cpu}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={instance.memory}
                            className="h-2 w-16 bg-secondary/50"
                          />
                          <span className="text-xs">{instance.memory}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Server className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="databases">
          <Card className="glass">
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle>Database Instances</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search databases..." className="w-full pl-10 md:w-[250px]" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Type
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Check className="mr-2 h-4 w-4" />
                        <span>All Types</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="ml-6">PostgreSQL</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="ml-6">MySQL</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="ml-6">Redis</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="ml-6">MongoDB</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Size</TableHead>
                    <TableHead className="hidden md:table-cell">Storage</TableHead>
                    <TableHead className="hidden md:table-cell">Connections</TableHead>
                    <TableHead className="hidden md:table-cell">CPU/Memory</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {databases.map((db) => (
                    <TableRow key={db.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${getStatusColor(db.status)}`} />
                          <span className="hidden md:inline">{getStatusBadge(db.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{db.name}</div>
                        <div className="text-xs text-muted-foreground">{db.id}</div>
                      </TableCell>
                      <TableCell>{db.type}</TableCell>
                      <TableCell className="hidden md:table-cell">{db.size}</TableCell>
                      <TableCell className="hidden md:table-cell">{db.storage}</TableCell>
                      <TableCell className="hidden md:table-cell">{db.connections}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs w-12">CPU:</span>
                            <Progress
                              value={db.cpu}
                              className="h-2 w-16 bg-secondary/50"
                            />
                            <span className="text-xs">{db.cpu}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs w-12">Memory:</span>
                            <Progress
                              value={db.memory}
                              className="h-2 w-16 bg-secondary/50"
                            />
                            <span className="text-xs">{db.memory}%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Database className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Network Infrastructure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="mb-2 font-medium">VPC: production-vpc</div>
                    <div className="text-sm text-muted-foreground">CIDR: 10.0.0.0/16</div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>Subnet: production-public-1a</div>
                        <div>10.0.1.0/24</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>Subnet: production-public-1b</div>
                        <div>10.0.2.0/24</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>Subnet: production-private-1a</div>
                        <div>10.0.3.0/24</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>Subnet: production-private-1b</div>
                        <div>10.0.4.0/24</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="mb-2 font-medium">VPC: staging-vpc</div>
                    <div className="text-sm text-muted-foreground">CIDR: 10.1.0.0/16</div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>Subnet: staging-public-1a</div>
                        <div>10.1.1.0/24</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>Subnet: staging-private-1a</div>
                        <div>10.1.2.0/24</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="mb-2 font-medium">Security Groups</div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>web-servers-sg</div>
                        <Badge variant="outline" className="border-accent-blue text-accent-blue">
                          3 instances
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>database-sg</div>
                        <Badge variant="outline" className="border-accent-purple text-accent-purple">
                          2 instances
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>cache-sg</div>
                        <Badge variant="outline" className="border-accent-green text-accent-green">
                          1 instance
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>worker-sg</div>
                        <Badge variant="outline" className="border-accent-yellow text-accent-yellow">
                          2 instances
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>bastion-sg</div>
                        <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                          1 instance
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="mb-2 font-medium">Network Traffic</div>
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>Inbound</div>
                          <div>8.5 TB / month</div>
                        </div>
                        <Progress value={65} className="h-2 bg-secondary/50"/>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>Outbound</div>
                          <div>3.2 TB / month</div>
                        </div>
                        <Progress value={35} className="h-2 bg-secondary/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Security & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="mb-2 font-medium">Security Status</div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-accent-green"></div>
                          <div className="text-sm">Firewall Rules</div>
                        </div>
                        <Badge variant="outline" className="border-accent-green text-accent-green">
                          Secure
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-accent-green"></div>
                          <div className="text-sm">Access Controls</div>
                        </div>
                        <Badge variant="outline" className="border-accent-green text-accent-green">
                          Secure
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-accent-yellow"></div>
                          <div className="text-sm">Encryption</div>
                        </div>
                        <Badge variant="outline" className="border-accent-yellow text-accent-yellow">
                          Warning
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-accent-green"></div>
                          <div className="text-sm">Vulnerability Scanning</div>
                        </div>
                        <Badge variant="outline" className="border-accent-green text-accent-green">
                          Secure
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-accent-red"></div>
                          <div className="text-sm">Patch Management</div>
                        </div>
                        <Badge variant="destructive" className="bg-accent-red">
                          Critical
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="mb-2 font-medium">Compliance Status</div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-accent-green"></div>
                          <div className="text-sm">GDPR</div>
                        </div>
                        <Badge variant="outline" className="border-accent-green text-accent-green">
                          Compliant
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-accent-green"></div>
                          <div className="text-sm">HIPAA</div>
                        </div>
                        <Badge variant="outline" className="border-accent-green text-accent-green">
                          Compliant
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-accent-yellow"></div>
                          <div className="text-sm">PCI DSS</div>
                        </div>
                        <Badge variant="outline" className="border-accent-yellow text-accent-yellow">
                          In Progress
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-accent-green"></div>
                          <div className="text-sm">SOC 2</div>
                        </div>
                        <Badge variant="outline" className="border-accent-green text-accent-green">
                          Compliant
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="mb-2 font-medium">Security Alerts</div>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-md bg-accent-red/10 p-3">
                        <div className="font-medium text-accent-red">Critical: Security Updates Required</div>
                        <div className="text-sm text-muted-foreground">
                          5 instances require critical security patches
                        </div>
                      </div>
                      <div className="rounded-md bg-accent-yellow/10 p-3">
                        <div className="font-medium text-accent-yellow">Warning: Encryption Configuration</div>
                        <div className="text-sm text-muted-foreground">
                          Some data at rest is not encrypted with the latest standards
                        </div>
                      </div>
                      <div className="rounded-md bg-accent-yellow/10 p-3">
                        <div className="font-medium text-accent-yellow">Warning: IAM Permissions</div>
                        <div className="text-sm text-muted-foreground">3 IAM roles have overly permissive policies</div>
                      </div>
                      <div className="rounded-md bg-accent-green/10 p-3">
                        <div className="font-medium text-accent-green">Info: Security Scan Complete</div>
                        <div className="text-sm text-muted-foreground">Weekly security scan completed successfully</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="mb-2 font-medium">Recommended Actions</div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between rounded-md bg-secondary/50 p-3">
                        <div className="text-sm">Apply security patches to 5 instances</div>
                        <Button variant="outline" size="sm" className="h-7 border-accent-red text-accent-red">
                          Fix Now
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-md bg-secondary/50 p-3">
                        <div className="text-sm">Update encryption configuration</div>
                        <Button variant="outline" size="sm" className="h-7 border-accent-yellow text-accent-yellow">
                          Review
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-md bg-secondary/50 p-3">
                        <div className="text-sm">Review IAM permissions</div>
                        <Button variant="outline" size="sm" className="h-7 border-accent-yellow text-accent-yellow">
                          Review
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-md bg-secondary/50 p-3">
                        <div className="text-sm">Complete PCI DSS compliance tasks</div>
                        <Button variant="outline" size="sm" className="h-7 border-accent-blue text-accent-blue">
                          View Tasks
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
