import { Controller, Get, UseGuards, Query } from "@nestjs/common"
import type { MonitoringService } from "./monitoring.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { GetUser } from "../users/decorators/get-user.decorator"
import type { User } from "@prisma/client"

@Controller("monitoring")
@UseGuards(JwtAuthGuard)
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get()
  getMonitoringData(@GetUser() user: User) {
    return this.monitoringService.getMonitoringData(user);
  }

  @Get("metrics")
  getMetrics(@GetUser() user: User, @Query('timeRange') timeRange: string = '24h') {
    return this.monitoringService.getMetrics(user, timeRange)
  }

  @Get('services')
  getServiceHealth(@GetUser() user: User) {
    return this.monitoringService.getServiceHealth(user);
  }

  @Get('alerts')
  getAlerts(@GetUser() user: User) {
    return this.monitoringService.getAlerts(user);
  }
}
