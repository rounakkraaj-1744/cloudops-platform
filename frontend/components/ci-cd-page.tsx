"use client"

import { useState } from "react"
import {
  Check,
  ChevronDown,
  Code2,
  Filter,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Play,
  RefreshCw,
  Search,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CICDPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const pipelines = [
    {
      id: "pipe-1234",
      name: "main",
      status: "success",
      commit: "a1b2c3d",
      message: "Update authentication flow",
      author: "John Doe",
      started: "2025-05-22T15:30:00Z",
      duration: "4m 12s",
    },
    {
      id: "pipe-1235",
      name: "feature/user-profiles",
      status: "running",
      commit: "e4f5g6h",
      message: "Add user profile editing",
      author: "Jane Smith",
      started: "2025-05-22T16:15:00Z",
      duration: "2m 45s",
    },
    {
      id: "pipe-1236",
      name: "fix/api-timeout",
      status: "failed",
      commit: "i7j8k9l",
      message: "Fix API timeout issues",
      author: "Bob Johnson",
      started: "2025-05-22T14:45:00Z",
      duration: "3m 30s",
    },
    {
      id: "pipe-1237",
      name: "feature/payment-gateway",
      status: "success",
      commit: "m1n2o3p",
      message: "Integrate new payment gateway",
      author: "Alice Williams",
      started: "2025-05-22T12:30:00Z",
      duration: "5m 15s",
    },
    {
      id: "pipe-1238",
      name: "main",
      status: "success",
      commit: "q4r5s6t",
      message: "Update dependencies",
      author: "John Doe",
      started: "2025-05-22T10:15:00Z",
      duration: "3m 45s",
    },
  ]

  const deployments = [
    {
      id: "dep-1234",
      environment: "production",
      status: "success",
      version: "v1.2.3",
      deployed_by: "John Doe",
      deployed_at: "2025-05-22T15:45:00Z",
      pipeline_id: "pipe-1234",
    },
    {
      id: "dep-1235",
      environment: "staging",
      status: "success",
      version: "v1.2.4-beta",
      deployed_by: "Jane Smith",
      deployed_at: "2025-05-22T16:30:00Z",
      pipeline_id: "pipe-1235",
    },
    {
      id: "dep-1236",
      environment: "development",
      status: "failed",
      version: "v1.2.4-dev",
      deployed_by: "Bob Johnson",
      deployed_at: "2025-05-22T14:50:00Z",
      pipeline_id: "pipe-1236",
    },
    {
      id: "dep-1237",
      environment: "staging",
      status: "success",
      version: "v1.2.3-beta",
      deployed_by: "Alice Williams",
      deployed_at: "2025-05-22T12:45:00Z",
      pipeline_id: "pipe-1237",
    },
    {
      id: "dep-1238",
      environment: "production",
      status: "success",
      version: "v1.2.2",
      deployed_by: "John Doe",
      deployed_at: "2025-05-22T10:30:00Z",
      pipeline_id: "pipe-1238",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-accent-green"
      case "running":
        return "bg-accent-blue"
      case "failed":
        return "bg-accent-red"
      default:
        return "bg-accent-yellow"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="border-accent-green text-accent-green">
            Success
          </Badge>
        )
      case "running":
        return (
          <Badge variant="outline" className="border-accent-blue text-accent-blue">
            Running
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive" className="bg-accent-red">
            Failed
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-accent-yellow text-accent-yellow">
            Pending
          </Badge>
        )
    }
  }

  const getEnvironmentBadge = (env: string) => {
    switch (env) {
      case "production":
        return (
          <Badge variant="outline" className="border-accent-blue text-accent-blue">
            Production
          </Badge>
        )
      case "staging":
        return (
          <Badge variant="outline" className="border-accent-purple text-accent-purple">
            Staging
          </Badge>
        )
      case "development":
        return (
          <Badge variant="outline" className="border-accent-green text-accent-green">
            Development
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
            {env}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6 p-6 w-full">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CI/CD</h1>
          <p className="text-muted-foreground">Pipelines, deployments, and build status</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last Day</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="default" size="sm" className="bg-accent-blue">
            <Play className="mr-2 h-4 w-4" />
            Run Pipeline
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pipelines">
        <TabsList className="mb-4">
          <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
        </TabsList>
        <TabsContent value="pipelines">
          <Card className="glass">
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle>Recent Pipelines</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search pipelines..."
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
                        <span className="ml-6">Success</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="ml-6">Running</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="ml-6">Failed</span>
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
                    <TableHead>Pipeline</TableHead>
                    <TableHead>Commit</TableHead>
                    <TableHead className="hidden md:table-cell">Author</TableHead>
                    <TableHead className="hidden md:table-cell">Started</TableHead>
                    <TableHead className="hidden md:table-cell">Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pipelines.map((pipeline) => (
                    <TableRow key={pipeline.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${getStatusColor(pipeline.status)}`} />
                          <span className="hidden md:inline">{getStatusBadge(pipeline.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{pipeline.name}</div>
                        <div className="text-xs text-muted-foreground md:hidden">
                          {pipeline.commit.substring(0, 7)} • {pipeline.author.split(" ")[0]}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <GitCommit className="h-4 w-4 text-muted-foreground" />
                          <span>{pipeline.commit.substring(0, 7)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{pipeline.message}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>
                              {pipeline.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{pipeline.author}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(pipeline.started)}</TableCell>
                      <TableCell className="hidden md:table-cell">{pipeline.duration}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <GitBranch className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pipeline Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.5%</div>
                <div className="text-xs text-muted-foreground">Last 30 days</div>
                <div className="mt-4">
                  <Progress value={92.5} className="h-2 bg-secondary/50"/>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Build Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3m 42s</div>
                <div className="text-xs text-muted-foreground">Last 30 days</div>
                <div className="mt-4">
                  <Progress value={65} className="h-2 bg-secondary/50"/>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Pipelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <div className="text-xs text-muted-foreground">Last 30 days</div>
                <div className="mt-4 flex gap-2">
                  <Badge variant="outline" className="border-accent-green text-accent-green">
                    144 Success
                  </Badge>
                  <Badge variant="destructive" className="bg-accent-red">
                    12 Failed
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deployments">
          <Card className="glass">
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle>Recent Deployments</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search deployments..." className="w-full pl-10 md:w-[250px]" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Environment
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Filter by Environment</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Check className="mr-2 h-4 w-4" />
                        <span>All Environments</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="ml-6">Production</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="ml-6">Staging</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="ml-6">Development</span>
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
                    <TableHead>Environment</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead className="hidden md:table-cell">Deployed By</TableHead>
                    <TableHead className="hidden md:table-cell">Deployed At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deployments.map((deployment) => (
                    <TableRow key={deployment.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${getStatusColor(deployment.status)}`} />
                          <span className="hidden md:inline">{getStatusBadge(deployment.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getEnvironmentBadge(deployment.environment)}
                        <div className="text-xs text-muted-foreground md:hidden">
                          {deployment.version} • {deployment.deployed_by.split(" ")[0]}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{deployment.version}</div>
                        <div className="text-xs text-muted-foreground">Pipeline: {deployment.pipeline_id}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>{deployment.deployed_by.split(" ").map((n) => n[0])}</AvatarFallback>
                          </Avatar>
                          <span>{deployment.deployed_by}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(deployment.deployed_at)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Code2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Deployment Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-green/20 text-accent-green">
                      <GitBranch className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Development</div>
                      <div className="text-xs text-muted-foreground">Automatic deployment from feature branches</div>
                    </div>
                    <Badge variant="outline" className="border-accent-green text-accent-green">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-0.5 bg-border" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-purple/20 text-accent-purple">
                      <GitPullRequest className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Staging</div>
                      <div className="text-xs text-muted-foreground">Deployed after PR merge to develop branch</div>
                    </div>
                    <Badge variant="outline" className="border-accent-purple text-accent-purple">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-0.5 bg-border" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/20 text-accent-blue">
                      <GitMerge className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Production</div>
                      <div className="text-xs text-muted-foreground">Manual approval required before deployment</div>
                    </div>
                    <Badge variant="outline" className="border-accent-blue text-accent-blue">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Deployment Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="text-sm text-muted-foreground">Total Deployments</div>
                    <div className="text-2xl font-bold">87</div>
                    <div className="text-xs text-muted-foreground">Last 30 days</div>
                  </div>
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                    <div className="text-2xl font-bold">94.3%</div>
                    <div className="text-xs text-muted-foreground">Last 30 days</div>
                  </div>
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="text-sm text-muted-foreground">Avg. Deployment Time</div>
                    <div className="text-2xl font-bold">2m 18s</div>
                    <div className="text-xs text-muted-foreground">Last 30 days</div>
                  </div>
                  <div className="rounded-md border border-border/30 p-4">
                    <div className="text-sm text-muted-foreground">Rollbacks</div>
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-xs text-muted-foreground">Last 30 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="artifacts">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Build Artifacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                Artifacts section coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}