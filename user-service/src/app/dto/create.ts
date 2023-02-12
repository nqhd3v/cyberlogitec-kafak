import { IsString } from 'class-validator';

class CreateDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  displayname: string;
}

export default CreateDto;
