"use client"

import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  Clock,
  Play,
  RefreshCw,
  AlertTriangle,
  MoreHorizontal,
  ChevronRight,
  Package,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample pipeline data
const pipelines = [
  {
    id: "pipe-001",
    name: "Frontend Deployment",
    branch: "main",
    commit: "a1b2c3d",
    status: "success",
    duration: "4m 32s",
    timestamp: "2025-05-22T09:30:00Z",
    stages: [
      { name: "Build", status: "success", duration: "1m 45s" },
      { name: "Test", status: "success", duration: "2m 10s" },
      { name: "Deploy", status: "success", duration: "37s" },
    ],
  },
  {
    id: "pipe-002",
    name: "Backend API",
    branch: "feature/payment-gateway",
    commit: "e4f5g6h",
    status: "running",
    duration: "3m 12s",
    timestamp: "2025-05-22T09:15:00Z",
    stages: [
      { name: "Build", status: "success", duration: "1m 20s" },
      { name: "Test", status: "running", duration: "1m 52s" },
      { name: "Deploy", status: "pending", duration: "0s" },
    ],
  },
  {
    id: "pipe-003",
    name: "Database Migration",
    branch: "fix/schema-update",
    commit: "i7j8k9l",
    status: "failed",
    duration: "2m 45s",
    timestamp: "2025-05-22T08:45:00Z",
    stages: [
      { name: "Build", status: "success", duration: "1m 05s" },
      { name: "Test", status: "failed", duration: "1m 40s" },
      { name: "Deploy", status: "pending", duration: "0s" },
    ],
  },
  {
    id: "pipe-004",
    name: "Auth Service",
    branch: "main",
    commit: "m1n2o3p",
    status: "success",
    duration: "5m 18s",
    timestamp: "2025-05-22T08:30:00Z",
    stages: [
      { name: "Build", status: "success", duration: "2m 12s" },
      { name: "Test", status: "success", duration: "2m 30s" },
      { name: "Deploy", status: "success", duration: "36s" },
    ],
  },
  {
    id: "pipe-005",
    name: "Analytics Dashboard",
    branch: "feature/real-time-charts",
    commit: "q4r5s6t",
    status: "warning",
    duration: "6m 22s",
    timestamp: "2025-05-22T08:00:00Z",
    stages: [
      { name: "Build", status: "success", duration: "2m 45s" },
      { name: "Test", status: "warning", duration: "3m 10s" },
      { name: "Deploy", status: "success", duration: "27s" },
    ],
  },
]

// Sample deployments data
const deployments = [
  {
    id: "deploy-001",
    environment: "Production",
    service: "Frontend",
    version: "v2.3.0",
    status: "success",
    timestamp: "2025-05-22T09:35:00Z",
    deployer: "CI/CD Pipeline",
  },
  {
    id: "deploy-002",
    environment: "Staging",
    service: "Backend API",
    version: "v1.8.5",
    status: "running",
    timestamp: "2025-05-22T09:20:00Z",
    deployer: "CI/CD Pipeline",
  },
  {
    id: "deploy-003",
    environment: "Production",
    service: "Auth Service",
    version: "v3.1.2",
    status: "success",
    timestamp: "2025-05-22T08:40:00Z",
    deployer: "CI/CD Pipeline",
  },
  {
    id: "deploy-004",
    environment: "Development",
    service: "Database Service",
    version: "v2.0.1",
    status: "failed",
    timestamp: "2025-05-22T08:15:00Z",
    deployer: "Manual (jane.doe)",
  },
  {
    id: "deploy-005",
    environment: "Staging",
    service: "Analytics Service",
    version: "v1.4.3",
    status: "warning",
    timestamp: "2025-05-22T07:50:00Z",
    deployer: "CI/CD Pipeline",
  },
]

// Function to format timestamp
function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}

// Function to get badge variant based on status
function getStatusBadge(status: string) {
  switch (status) {
    case "success":
      return <Badge className="bg-green-500">Success</Badge>
    case "running":
      return <Badge className="bg-blue-500">Running</Badge>
    case "failed":
      return <Badge className="bg-red-500">Failed</Badge>
    case "warning":
      return <Badge className="bg-yellow-500">Warning</Badge>
    case "pending":
      return <Badge variant="outline">Pending</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

// Function to get status icon
function getStatusIcon(status: string) {
  switch (status) {
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "running":
      return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
    case "failed":
      return <XCircle className="h-5 w-5 text-red-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    case "pending":
      return <Clock className="h-5 w-5 text-muted-foreground" />
    default:
      return <Clock className="h-5 w-5 text-muted-foreground" />
  }
}

export function CiCdDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">CI/CD Pipeline</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <GitBranch className="mr-2 h-4 w-4" />
            Branches
          </Button>
          <Button variant="outline" size="sm">
            <GitPullRequest className="mr-2 h-4 w-4" />
            Pull Requests
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <Play className="mr-2 h-4 w-4" />
            Run Pipeline
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pipelines" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pipelines" className="flex items-center">
            <GitBranch className="mr-2 h-4 w-4" />
            Pipelines
          </TabsTrigger>
          <TabsTrigger value="deployments" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            Deployments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipelines" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GitBranch className="mr-2 h-5 w-5 text-primary" />
                Recent Pipelines
              </CardTitle>
              <CardDescription>View and manage CI/CD pipelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pipelines.map((pipeline) => (
                  <div key={pipeline.id} className="rounded-lg border border-border p-4 card-hover-effect">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(pipeline.status)}
                        <div>
                          <h3 className="font-medium">{pipeline.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <GitBranch className="mr-1 h-3 w-3" />
                            <span className="mr-3">{pipeline.branch}</span>
                            <GitCommit className="mr-1 h-3 w-3" />
                            <span>{pipeline.commit}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-sm">{pipeline.duration}</div>
                          <div className="text-xs text-muted-foreground">{formatTimestamp(pipeline.timestamp)}</div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Rerun Pipeline</DropdownMenuItem>
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {pipeline.stages.map((stage, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <span className="font-medium mr-2">{stage.name}</span>
                              {getStatusBadge(stage.status)}
                            </div>
                            <span className="text-muted-foreground">{stage.duration}</span>
                          </div>
                          <Progress
                            value={
                              stage.status === "success"
                                ? 100
                                : stage.status === "running"
                                  ? 60
                                  : stage.status === "failed"
                                    ? 100
                                    : stage.status === "warning"
                                      ? 100
                                      : 0
                            }
                            className={`h-2 ${
                              stage.status === "success"
                                ? "bg-green-500"
                                : stage.status === "running"
                                  ? "bg-blue-500"
                                  : stage.status === "failed"
                                    ? "bg-red-500"
                                    : stage.status === "warning"
                                      ? "bg-yellow-500"
                                      : ""
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5 text-primary" />
                Recent Deployments
              </CardTitle>
              <CardDescription>Track deployments across environments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Deployed At</TableHead>
                    <TableHead>Deployer</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deployments.map((deployment) => (
                    <TableRow key={deployment.id} className="cursor-pointer hover:bg-secondary/50">
                      <TableCell>
                        <div className="flex items-center">{getStatusIcon(deployment.status)}</div>
                      </TableCell>
                      <TableCell className="font-medium">{deployment.service}</TableCell>
                      <TableCell>{deployment.version}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            deployment.environment === "Production"
                              ? "border-green-500 text-green-500"
                              : deployment.environment === "Staging"
                                ? "border-blue-500 text-blue-500"
                                : "border-yellow-500 text-yellow-500"
                          }
                        >
                          {deployment.environment}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatTimestamp(deployment.timestamp)}</TableCell>
                      <TableCell>{deployment.deployer}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitBranch className="mr-2 h-5 w-5 text-primary" />
              Active Branches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">main</span>
                </div>
                <span className="text-xs text-muted-foreground">Last commit: 15m ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">feature/payment-gateway</span>
                </div>
                <span className="text-xs text-muted-foreground">Last commit: 45m ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">fix/schema-update</span>
                </div>
                <span className="text-xs text-muted-foreground">Last commit: 1h ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">feature/real-time-charts</span>
                </div>
                <span className="text-xs text-muted-foreground">Last commit: 2h ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">develop</span>
                </div>
                <span className="text-xs text-muted-foreground">Last commit: 3h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitPullRequest className="mr-2 h-5 w-5 text-primary" />
              Pull Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">PR #123: Add payment gateway</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  Ready to merge
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">PR #122: Update user schema</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  Changes requested
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">PR #121: Fix login bug</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  In review
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">PR #120: Add analytics dashboard</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  Tests failing
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">PR #119: Update dependencies</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  Ready to merge
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5 text-primary" />
              Deployment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Production</span>
                  <Badge className="bg-green-500">Healthy</Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>Frontend: v2.3.0</span>
                  <span className="mx-2">•</span>
                  <span>Backend: v1.8.2</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Staging</span>
                  <Badge className="bg-blue-500">Deploying</Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>Frontend: v2.3.0</span>
                  <span className="mx-2">•</span>
                  <span>Backend: v1.8.5</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Development</span>
                  <Badge className="bg-red-500">Failed</Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>Frontend: v2.3.1-dev</span>
                  <span className="mx-2">•</span>
                  <span>Backend: v1.9.0-dev</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">QA</span>
                  <Badge className="bg-green-500">Healthy</Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>Frontend: v2.2.5</span>
                  <span className="mx-2">•</span>
                  <span>Backend: v1.8.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
