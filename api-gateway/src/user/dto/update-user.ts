import { IsString } from 'class-validator';

class UpdateUserDto {
  @IsString()
  displayname: string;

  @IsString()
  username: string;
}

export default UpdateUserDto;
