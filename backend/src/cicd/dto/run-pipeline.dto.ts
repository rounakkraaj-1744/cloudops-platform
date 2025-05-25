import { IsNotEmpty, IsString, IsOptional } from "class-validator"

export class RunPipelineDto {
  @IsString()
  @IsNotEmpty()
  projectId: string

  @IsString()
  @IsOptional()
  branch?: string = "main"
}
