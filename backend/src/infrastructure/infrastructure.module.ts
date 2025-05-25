import { Module } from "@nestjs/common";
import { InfrastructureController } from "./indrastructure.controller";
import { InfrastructureService } from "./infrastructure.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [InfrastructureController],
    providers: [InfrastructureService],
    exports: [InfrastructureService]
})
export class InfrastructureModule {}