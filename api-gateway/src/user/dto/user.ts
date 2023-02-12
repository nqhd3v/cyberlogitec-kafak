import { IsString } from 'class-validator';

class UserDto {
  @IsString()
  displayname: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}

export default UserDto;
