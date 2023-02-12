import { IsString } from 'class-validator';

class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  displayname: string;
}

export default RegisterDto;
