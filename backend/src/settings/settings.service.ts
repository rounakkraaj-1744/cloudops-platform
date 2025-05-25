import { Injectable } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { User } from "@prisma/client"
import type { UpdateSettingsDto } from "./dto/update-settings.dto"

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings(user: User) {
    const settings = await this.prisma.settings.findUnique({
      where: { userId: user.id },
    })

    if (!settings) {
      return {
        theme: "system",
        notifications: true,
        emailNotifications: true,
        language: "en",
      }
    }

    return settings
  }

  async updateSettings(updateSettingsDto: UpdateSettingsDto, user: User) {
    const updatedSettings = await this.prisma.settings.upsert({
      where: { userId: user.id },
      update: updateSettingsDto,
      create: {
        ...updateSettingsDto,
        userId: user.id,
      },
    })

    return updatedSettings
  }
}
