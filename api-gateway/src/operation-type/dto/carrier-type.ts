import { IsBoolean, IsOptional, IsString } from 'class-validator';

class CarrierTypeDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsBoolean()
  in_tml: boolean;

  @IsOptional()
  @IsString()
  bg_color: string;
  @IsOptional()
  @IsString()
  font_color: string;
}

export default CarrierTypeDto;
