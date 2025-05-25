import { Controller, Get, UseGuards, Query } from "@nestjs/common"
import type { LoggingService } from "./logging.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { GetUser } from "../users/decorators/get-user.decorator"
import type { User } from "@prisma/client"

@Controller("logs")
@UseGuards(JwtAuthGuard)
export class LoggingController {
  constructor(private readonly logsService: LoggingService) {}

  @Get()
  getLogs( @Query('timeRange') timeRange: string = '24h',
    @Query('level') level: string = 'all',
    @Query('service') service: string = 'all',
    @Query('search') search: string = '',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @GetUser() user: User,
  ) {
    return this.logsService.getLogs(user, timeRange, level, service, search, page, limit)
  }

  @Get('statistics')
  getLogStatistics(@GetUser() user: User) {
    return this.logsService.getLogStatistics(user);
  }

  @Get('common-errors')
  getCommonErrors(@GetUser() user: User) {
    return this.logsService.getCommonErrors(user);
  }
}
