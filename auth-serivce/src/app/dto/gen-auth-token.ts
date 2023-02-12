import { IsString } from 'class-validator';

class GenAuthTokenDto {
  @IsString()
  userId: string;
}

export default GenAuthTokenDto;
