import { IsNotEmpty, IsString, IsEnum, IsOptional, IsObject } from "class-validator"
import { ResourceType } from "@prisma/client"

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEnum(ResourceType)
  @IsNotEmpty()
  type: ResourceType

  @IsString()
  @IsNotEmpty()
  projectId: string

  @IsString()
  @IsOptional()
  region?: string

  @IsObject()
  @IsOptional()
  details?: Record<string, any>
}
