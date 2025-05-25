import { Injectable } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { User } from "@prisma/client"

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData(user: User) {
    const [projectCount, deploymentCount, resourceCount, successfulDeployments, failedDeployments] = await Promise.all([
      this.prisma.project.count({
        where: { userId: user.id },
      }),
      this.prisma.deployment.count({
        where: { userId: user.id },
      }),
      this.prisma.resource.count({
        where: { project: { userId: user.id } },
      }),
      this.prisma.deployment.count({
        where: { userId: user.id, status: "SUCCESS" },
      }),
      this.prisma.deployment.count({
        where: { userId: user.id, status: "FAILED" },
      }),
    ])

    const clusterHealth = 98.3
    const uptime = 99.99
    const activeAlerts = 2
    const resourceUsage = 68

    return {
      overview: {
        projectCount,
        deploymentCount,
        resourceCount,
        successRate: deploymentCount > 0 ? (successfulDeployments / deploymentCount) * 100 : 100,
      },
      systemHealth: {
        clusterHealth,
        uptime,
        activeAlerts,
        resourceUsage,
      },
    }
  }

  async getMetrics(user: User) {
    // Mock metrics data for CPU, memory, disk, and network
    const cpuData = {
      labels: ["12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30"],
      datasets: [
        {
          label: "CPU Usage",
          data: [65, 59, 80, 81, 56, 55, 68],
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
          data: [40, 45, 50, 48, 42, 39, 42],
          borderColor: "hsl(var(--accent-purple))",
          backgroundColor: "rgba(147, 51, 234, 0.1)",
          tension: 0.3,
        },
      ],
    }

    const diskData = {
      labels: ["12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30"],
      datasets: [
        {
          label: "Disk Usage",
          data: [50, 52, 55, 57, 56, 55, 56],
          borderColor: "hsl(var(--accent-green))",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.3,
        },
      ],
    }

    const networkData = {
      labels: ["12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30"],
      datasets: [
        {
          label: "Network Usage",
          data: [25, 30, 35, 40, 38, 35, 35],
          borderColor: "hsl(var(--accent-yellow))",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          tension: 0.3,
        },
      ],
    }

    // Current usage values
    const currentUsage = {
      cpu: 68,
      memory: 42,
      disk: 56,
      network: 35,
    }

    return {
      cpuData,
      memoryData,
      diskData,
      networkData,
      currentUsage,
    }
  }

  async getRecentDeployments(user: User) {
    const deployments = await this.prisma.deployment.findMany({
      where: { userId: user.id },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        startedAt: "desc",
      },
      take: 5,
    })

    //mock data
    if (deployments.length === 0) {
      return [
        {
          id: "mock-1",
          name: "api-service",
          status: "SUCCESS",
          time: "10 minutes ago",
          env: "production",
        },
        {
          id: "mock-2",
          name: "web-frontend",
          status: "SUCCESS",
          time: "25 minutes ago",
          env: "staging",
        },
        {
          id: "mock-3",
          name: "auth-service",
          status: "FAILED",
          time: "1 hour ago",
          env: "development",
        },
        {
          id: "mock-4",
          name: "database-migration",
          status: "RUNNING",
          time: "Just now",
          env: "production",
        },
      ]
    }

    return deployments.map((deployment) => ({
      id: deployment.id,
      name: deployment.project.name,
      status: deployment.status,
      time: this.formatTimeAgo(deployment.startedAt),
      env: deployment.environment,
    }))
  }

  async getRecentAlerts(user: User) {
    return [
      {
        id: "alert-1",
        title: "High CPU Usage",
        description: "api-service-pod-3 exceeding threshold",
        time: "10 minutes ago",
        severity: "critical",
      },
      {
        id: "alert-2",
        title: "Memory Leak Detected",
        description: "web-frontend-pod-2 memory increasing",
        time: "25 minutes ago",
        severity: "warning",
      },
      {
        id: "alert-3",
        title: "Database Connection Failures",
        description: "auth-service unable to connect to DB",
        time: "1 hour ago",
        severity: "critical",
      },
      {
        id: "alert-4",
        title: "Disk Space Low",
        description: "storage-node-1 at 85% capacity",
        time: "2 hours ago",
        severity: "warning",
      },
    ]
  }

  private formatTimeAgo(date: Date): string {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "Just now"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }
}
