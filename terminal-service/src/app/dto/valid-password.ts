import { IsString } from 'class-validator';

class ValidPassDto {
  @IsString()
  passwordEncrypted: string;

  @IsString()
  password: string;
}

export default ValidPassDto;
