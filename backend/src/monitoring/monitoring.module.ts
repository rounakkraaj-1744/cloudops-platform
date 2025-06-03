import { Module } from "@nestjs/common"
import { MonitoringService } from "./monitoring.service"
import { MonitoringController } from "./monitoring.controller"
import { PrismaModule } from "src/prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [MonitoringController],
  providers: [MonitoringService],
})
export class MonitoringModule {}
