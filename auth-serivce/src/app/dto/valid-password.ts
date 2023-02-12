import { IsString } from 'class-validator';

class ValidPassDto {
  @IsString()
  encrypted: string;

  @IsString()
  password: string;
}

export default ValidPassDto;
