import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { User } from "@prisma/client"
import type { RunPipelineDto } from "./dto/run-pipeline.dto"

@Injectable()
export class CicdService {
  constructor(private readonly prisma: PrismaService) {}

  async getPipelines(user: User, timeRange = "7d", status = "all", search = "", page = 1, limit = 10) {
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

    let filteredPipelines = pipelines
    if (status !== "all")
      filteredPipelines = filteredPipelines.filter((pipeline) => pipeline.status === status)

    if (search) {
      const searchLower = search.toLowerCase()
      filteredPipelines = filteredPipelines.filter(
        (pipeline) =>
          pipeline.name.toLowerCase().includes(searchLower) ||
          pipeline.commit.toLowerCase().includes(searchLower) ||
          pipeline.message.toLowerCase().includes(searchLower) ||
          pipeline.author.toLowerCase().includes(searchLower),
      )
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedPipelines = filteredPipelines.slice(startIndex, endIndex)

    return {
      data: paginatedPipelines,
      meta: {
        total: filteredPipelines.length,
        page,
        limit,
        totalPages: Math.ceil(filteredPipelines.length / limit),
      },
    }
  }

  async getDeployments(user: User, environment = "all", status = "all", search = "", page = 1, limit = 10) {
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

    let filteredDeployments = deployments
    if (environment !== "all")
      filteredDeployments = filteredDeployments.filter((deployment) => deployment.environment === environment)

    if (status !== "all") 
      filteredDeployments = filteredDeployments.filter((deployment) => deployment.status === status)

    if (search) {
      const searchLower = search.toLowerCase()
      filteredDeployments = filteredDeployments.filter(
        (deployment) =>
          deployment.version.toLowerCase().includes(searchLower) ||
          deployment.deployed_by.toLowerCase().includes(searchLower) ||
          deployment.environment.toLowerCase().includes(searchLower),
      )
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedDeployments = filteredDeployments.slice(startIndex, endIndex)

    return {
      data: paginatedDeployments,
      meta: {
        total: filteredDeployments.length,
        page,
        limit,
        totalPages: Math.ceil(filteredDeployments.length / limit),
      },
    }
  }

  async getStatistics(user: User) {
    return {
      pipelineSuccessRate: 92.5,
      averageBuildTime: "3m 42s",
      totalPipelines: 156,
      successfulPipelines: 144,
      failedPipelines: 12,
      deploymentStats: {
        totalDeployments: 87,
        successRate: 94.3,
        averageDeploymentTime: "2m 18s",
        rollbacks: 2,
      },
    }
  }

  async runPipeline(runPipelineDto: RunPipelineDto, user: User) {
    const { projectId, branch } = runPipelineDto
    return {
      id: `pipe-${Math.floor(Math.random() * 10000)}`,
      projectId,
      branch,
      status: "running",
      started: new Date().toISOString(),
      message: `Pipeline started for branch ${branch}`,
    }
  }

  async getPipelineDetails(id: string, user: User) {
    const pipeline = {
      id,
      name: "feature/user-profiles",
      status: "success",
      commit: "e4f5g6h",
      message: "Add user profile editing",
      author: "Jane Smith",
      started: "2025-05-22T16:15:00Z",
      finished: "2025-05-22T16:18:00Z",
      duration: "3m 0s",
      repository: "github.com/organization/project",
      branch: "feature/user-profiles",
      stages: [
        {
          name: "Build",
          status: "success",
          duration: "1m 15s",
          logs: "Building application...\nBuild successful",
        },
        {
          name: "Test",
          status: "success",
          duration: "1m 30s",
          logs: "Running tests...\nAll tests passed",
        },
        {
          name: "Deploy",
          status: "success",
          duration: "0m 15s",
          logs: "Deploying to staging...\nDeployment successful",
        },
      ],
    }

    if (!pipeline) 
      throw new NotFoundException(`Pipeline with ID ${id} not found`)

    return pipeline
  }

  async getDeploymentDetails(id: string, user: User) {
    const deployment = {
      id,
      environment: "staging",
      status: "success",
      version: "v1.2.4-beta",
      deployed_by: "Jane Smith",
      deployed_at: "2025-05-22T16:30:00Z",
      finished_at: "2025-05-22T16:32:00Z",
      duration: "2m 0s",
      pipeline_id: "pipe-1235",
      services: [
        {
          name: "api-service",
          status: "success",
          version: "v1.2.4-beta",
          logs: "Deploying api-service...\nDeployment successful",
        },
        {
          name: "web-frontend",
          status: "success",
          version: "v1.2.4-beta",
          logs: "Deploying web-frontend...\nDeployment successful",
        },
        {
          name: "database-migrations",
          status: "success",
          version: "v1.2.4-beta",
          logs: "Running database migrations...\nMigrations successful",
        },
      ],
    }

    if (!deployment)
      throw new NotFoundException(`Deployment with ID ${id} not found`)

    return deployment
  }
}
