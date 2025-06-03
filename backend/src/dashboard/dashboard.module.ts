import { Module } from "@nestjs/common"
import { DashboardController } from "./dashboard.controller"
import { DashboardService } from "./dashboard.service"
import { PrismaService } from "src/prisma/prisma.service"
import { PrismaModule } from "src/prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [DashboardController],
  providers: [DashboardService, PrismaService],
  exports: [DashboardService]
})
export class DashboardModule {}
