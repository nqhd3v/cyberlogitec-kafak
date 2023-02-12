import { IsString } from 'class-validator';

class ValidUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export default ValidUserDto;
