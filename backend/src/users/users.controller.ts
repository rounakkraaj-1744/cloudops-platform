import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import type { UsersService } from "./users.service"
import type { CreateUserDto } from "./dto/create-user.dto"
import type { UpdateUserDto } from "./dto/update-user.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { GetUser } from "./decorators/get-user.decorator"
import { type User, Role } from "@prisma/client"
import { Roles } from "./decorators/roles.decorator"
import { RolesGuard } from "./guards/roles.guard"

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.usersService.findAll(+page, +limit)
  }

  @Get(":id")
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.usersService.findOne(id, user)
  }

  @Patch(":id")
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.usersService.update(id, updateUserDto, user)
  }

  @Delete(":id")
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.usersService.remove(id, user)
  }
}
