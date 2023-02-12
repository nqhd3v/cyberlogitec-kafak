import { IsOptional, IsString } from 'class-validator';

class OperationTypeDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  prefix: string;

  @IsOptional()
  @IsString()
  bg_color: string;
  @IsOptional()
  @IsString()
  font_color: string;
}

export default OperationTypeDto;
