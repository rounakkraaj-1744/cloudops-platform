import { Controller, Get, Post, Body, Param, UseGuards, Query } from "@nestjs/common"
import type { InfrastructureService } from "./infrastructure.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { GetUser } from "../users/decorators/get-user.decorator"
import type { User } from "@prisma/client"
import type { CreateResourceDto } from "./dto/create-resource.dto"

@Controller("infrastructure")
@UseGuards(JwtAuthGuard)
export class InfrastructureController {
  constructor(private readonly infrastructureService: InfrastructureService) {}

  @Get("instances")
  getInstances(
    @GetUser() user: User, @Query('region') region: string = 'all',
    @Query('status') status: string = 'all',
    @Query('search') search: string = '',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.infrastructureService.getInstances(user, region, status, search, Number(page), Number(limit))
  }

  @Get("databases")
  getDatabases(@GetUser() user: User, @Query('type') type: string = 'all', @Query('status') status: string = 'all',
    @Query('search') search: string = '', @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.infrastructureService.getDatabases(user, type, status, search, Number(page), Number(limit))
  }

  @Get('network')
  getNetwork(@GetUser() user: User) {
    return this.infrastructureService.getNetwork(user);
  }

  @Get('security')
  getSecurity(@GetUser() user: User) {
    return this.infrastructureService.getSecurity(user);
  }

  @Post("resources")
  createResource(@Body() createResourceDto: CreateResourceDto, @GetUser() user: User) {
    return this.infrastructureService.createResource(createResourceDto, user)
  }

  @Get("resources/:id")
  getResourceDetails(@Param('id') id: string, @GetUser() user: User) {
    return this.infrastructureService.getResourceDetails(id, user)
  }
}
