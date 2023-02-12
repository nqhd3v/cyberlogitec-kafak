import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  ConfigurationGroup,
  ConfigurationValueType,
} from '../configuration.enum';

class ConfigurationDto {
  @IsString()
  @IsEnum(ConfigurationGroup)
  group: string;

  @IsString()
  item: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  @IsEnum(ConfigurationValueType)
  value_type: string;

  @IsOptional()
  @IsString()
  value_1: string;

  @IsOptional()
  @IsString()
  value_2: string;
}

export default ConfigurationDto;
