import { Controller, Get, Post, Body, Param, UseGuards, Query } from "@nestjs/common"
import type { CicdService } from "./cicd.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { GetUser } from "../users/decorators/get-user.decorator"
import type { User } from "@prisma/client"
import type { RunPipelineDto } from "./dto/run-pipeline.dto"

@Controller("cicd")
@UseGuards(JwtAuthGuard)
export class CicdController {
  constructor(private readonly cicdService: CicdService) {}

  @Get("pipelines")
  getPipelines( @GetUser() user: User, @Query('timeRange') timeRange: string = '7d', @Query('status') status: string = 'all',
    @Query('search') search: string = '', @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.cicdService.getPipelines(user, timeRange, status, search, page, limit)
  }

  @Get("deployments")
  getDeployments( @GetUser() user: User, @Query('environment') environment: string = 'all',
    @Query('status') status: string = 'all', @Query('search') search: string = '',
    @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.cicdService.getDeployments(user, environment, status, search, page, limit)
  }

  @Get('statistics')
  getStatistics(@GetUser() user: User) {
    return this.cicdService.getStatistics(user);
  }

  @Post("pipelines/run")
  runPipeline(@Body() runPipelineDto: RunPipelineDto, @GetUser() user: User) {
    return this.cicdService.runPipeline(runPipelineDto, user)
  }

  @Get("pipelines/:id")
  getPipelineDetails(@Param('id') id: string, @GetUser() user: User) {
    return this.cicdService.getPipelineDetails(id, user)
  }

  @Get("deployments/:id")
  getDeploymentDetails(@Param('id') id: string, @GetUser() user: User) {
    return this.cicdService.getDeploymentDetails(id, user)
  }
}
