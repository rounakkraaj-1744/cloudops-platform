import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "./prisma/prisma.module"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { DashboardModule } from "./dashboard/dashboard.module"
import { MonitoringModule } from "./monitoring/monitoring.module"
import { LoggingModule } from "./logging/logging.module"
import { CicdModule } from "./cicd/cicd.module"
import { InfrastructureModule } from "./infrastructure/infrastructure.module"
import { SettingsModule } from "./settings/settings.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DashboardModule,
    MonitoringModule,
    LoggingModule,
    CicdModule,
    InfrastructureModule,
    SettingsModule,
  ],
})
export class AppModule {}
