import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config"

import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UsersModule } from "../users/users.module"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { LocalStrategy } from "./strategies/local.strategy"
import { GoogleStrategy } from "./strategies/google.strategy"
import { GithubStrategy } from "./strategies/github.strategy"
import { PrismaModule } from "src/prisma/prisma.module"

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get("JWT_EXPIRES_IN", "1d"),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, GoogleStrategy, GithubStrategy],
  exports: [AuthService],
})
export class AuthModule {}
