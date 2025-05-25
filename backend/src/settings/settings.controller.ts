import { Controller, Get, Patch, Body, UseGuards } from "@nestjs/common"
import type { SettingsService } from "./settings.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { GetUser } from "../users/decorators/get-user.decorator"
import type { User } from "@prisma/client"
import type { UpdateSettingsDto } from "./dto/update-settings.dto"

@Controller("settings")
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(@GetUser() user: User) {
    return this.settingsService.getSettings(user);
  }

  @Patch()
  updateSettings(@Body() updateSettingsDto: UpdateSettingsDto, @GetUser() user: User) {
    return this.settingsService.updateSettings(updateSettingsDto, user)
  }
}
