import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsEnum, IsOptional } from "class-validator"
import { Role } from "@prisma/client"

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsEnum(Role)
  @IsOptional()
  role?: Role
}
