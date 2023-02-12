import { IsOptional, IsString } from 'class-validator';

class TerminalDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  local_port: string;

  @IsString()
  type: string;

  @IsString()
  displayname: string;

  @IsString()
  company_1: string;
  @IsString()
  company_2: string;

  // @IsOptional()
  @IsString()
  global_terminal_operation_1: string;
  @IsOptional()
  @IsString()
  global_terminal_operation_2: string;

  @IsString()
  timezone: string;

  @IsOptional()
  @IsString()
  address_1: string;
  @IsOptional()
  @IsString()
  address_2: string;

  @IsOptional()
  @IsString()
  lat: string;
  @IsOptional()
  @IsString()
  long: string;

  @IsOptional()
  @IsString()
  tel: string;
  @IsOptional()
  @IsString()
  fax: string;
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  bg_color: string;
  @IsOptional()
  @IsString()
  font_color: string;
}

export default TerminalDto;
