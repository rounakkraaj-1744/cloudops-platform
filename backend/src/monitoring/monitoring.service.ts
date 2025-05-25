import { Injectable } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { User } from "@prisma/client"

@Injectable()
export class MonitoringService {
  constructor(private readonly prisma: PrismaService) {}

  async getMonitoringData(user: User) {
    // Mock monitoring overview data
    return {
      cpuUsage: {
        value: 68,
        trend: "down",
        trendValue: 12,
      },
      memoryUsage: {
        value: 42,
        trend: "down",
        trendValue: 8,
      },
      diskIO: {
        value: 125,
        unit: "MB/s",
        trend: "up",
        trendValue: 15,
      },
      network: {
        value: 85,
        unit: "Mbps",
        trend: "up",
        trendValue: 20,
      },
    }
  }

  async getMetrics(user: User, timeRange: string) {
    // Generate time labels based on timeRange
    const labels = this.generateTimeLabels(timeRange)

    // Mock metrics data for CPU, memory, disk, and network
    const cpuData = {
      labels,
      datasets: [
        {
          label: "API Server",
          data: this.generateRandomData(labels.length, 40, 80),
          borderColor: "hsl(var(--accent-blue))",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.3,
        },
        {
          label: "Database",
          data: this.generateRandomData(labels.length, 20, 90),
          borderColor: "hsl(var(--accent-purple))",
          backgroundColor: "rgba(147, 51, 234, 0.1)",
          tension: 0.3,
        },
        {
          label: "Cache",
          data: this.generateRandomData(labels.length, 15, 75),
          borderColor: "hsl(var(--accent-green))",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.3,
        },
      ],
    }

    const memoryData = {
      labels,
      datasets: [
        {
          label: "API Server",
          data: this.generateRandomData(labels.length, 35, 60),
          borderColor: "hsl(var(--accent-blue))",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.3,
        },
        {
          label: "Database",
          data: this.generateRandomData(labels.length, 55, 85),
          borderColor: "hsl(var(--accent-purple))",
          backgroundColor: "rgba(147, 51, 234, 0.1)",
          tension: 0.3,
        },
        {
          label: "Cache",
          data: this.generateRandomData(labels.length, 20, 35),
          borderColor: "hsl(var(--accent-green))",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.3,
        },
      ],
    }

    const diskData = {
      labels,
      datasets: [
        {
          label: "Read",
          data: this.generateRandomData(labels.length, 50, 150),
          borderColor: "hsl(var(--accent-blue))",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.3,
        },
        {
          label: "Write",
          data: this.generateRandomData(labels.length, 30, 100),
          borderColor: "hsl(var(--accent-purple))",
          backgroundColor: "rgba(147, 51, 234, 0.1)",
          tension: 0.3,
        },
      ],
    }

    const networkData = {
      labels,
      datasets: [
        {
          label: "Inbound",
          data: this.generateRandomData(labels.length, 40, 90),
          borderColor: "hsl(var(--accent-green))",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.3,
        },
        {
          label: "Outbound",
          data: this.generateRandomData(labels.length, 30, 80),
          borderColor: "hsl(var(--accent-yellow))",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          tension: 0.3,
        },
      ],
    }

    return {
      cpuData,
      memoryData,
      diskData,
      networkData,
      timeRange,
      lastUpdated: new Date().toISOString(),
    }
  }

  async getServiceHealth(user: User) {
    // Mock service health data
    return [
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
    ]
  }

  async getAlerts(user: User) {
    // Mock alerts data
    return [
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
    ]
  }

  private generateTimeLabels(timeRange: string): string[] {
    const labels = []
    let count = 12 // Default number of points

    switch (timeRange) {
      case "1h":
        count = 12
        for (let i = 0; i < count; i++) {
          const minutes = i * 5
          labels.push(`${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, "0")}`)
        }
        break
      case "6h":
        count = 12
        for (let i = 0; i < count; i++) {
          const minutes = i * 30
          labels.push(`${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, "0")}`)
        }
        break
      case "24h":
      default:
        count = 12
        for (let i = 0; i < count; i++) {
          const hours = i * 2
          labels.push(`${hours.toString().padStart(2, "0")}:00`)
        }
        break
      case "7d":
        count = 7
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        for (let i = 0; i < count; i++) {
          labels.push(days[i])
        }
        break
      case "30d":
        count = 10
        for (let i = 0; i < count; i++) {
          labels.push(`Day ${i * 3 + 1}`)
        }
        break
    }

    return labels
  }

  private generateRandomData(count: number, min: number, max: number): number[] {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min)
  }
}
