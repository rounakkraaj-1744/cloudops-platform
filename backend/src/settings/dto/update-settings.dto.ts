import { IsString, IsBoolean, IsOptional } from "class-validator"

export class UpdateSettingsDto {
  @IsString()
  @IsOptional()
  theme?: string

  @IsBoolean()
  @IsOptional()
  notifications?: boolean

  @IsBoolean()
  @IsOptional()
  emailNotifications?: boolean

  @IsString()
  @IsOptional()
  language?: string
}