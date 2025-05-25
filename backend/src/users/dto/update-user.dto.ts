import { IsEmail, IsString, MinLength, MaxLength, IsEnum, IsOptional, IsBoolean } from "class-validator"
import { Role } from "@prisma/client"

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(32)
  password?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsEnum(Role)
  @IsOptional()
  role?: Role

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @IsString()
  @IsOptional()
  avatar?: string
}
