import { Module } from "@nestjs/common"
import { CicdService } from "./cicd.service"
import { CicdController } from "./cicd.controller"
import { PrismaModule } from "src/prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [CicdController],
  providers: [CicdService],
})
export class CicdModule {}
