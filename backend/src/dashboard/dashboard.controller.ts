import { Controller, Get } from "@nestjs/common"
import type { DashboardService } from "./dashboard.service"
import { GetUser } from "../users/decorators/get-user.decorator"
import type { User } from "@prisma/client"

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboardData(@GetUser() user: User) {
    return this.dashboardService.getDashboardData(user);
  }

  @Get("metrics")
  getMetrics(@GetUser() user: User) {
    return this.dashboardService.getMetrics(user);
  }

  @Get("deployments/recent")
  getRecentDeployments(@GetUser() user: User) {
    return this.dashboardService.getRecentDeployments(user);
  }

  @Get("alerts/recent")
  getRecentAlerts(@GetUser() user: User) {
    return this.dashboardService.getRecentAlerts(user);
  }
}
