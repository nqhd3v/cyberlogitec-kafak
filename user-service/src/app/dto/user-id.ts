import { IsString } from 'class-validator';

class UserIdDto {
  @IsString()
  userId: string;
}

export default UserIdDto;
