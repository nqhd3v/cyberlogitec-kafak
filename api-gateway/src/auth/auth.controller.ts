import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Http400Exception } from 'utils/Exception/http-400.exception';
import { Http503Exception } from 'utils/Exception/http-503.exception';
import { AuthService } from './auth.service';
import { iReqWithUser } from './auth.types';
import RegisterDto from './dto/register';
import LocalAuthGuard from './gaurd/local.gaurd';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async createUser(@Body() data: RegisterDto) {
    try {
      const user = await this.userService.getByFields({
        username: data.username,
      });
      if (user) {
        throw new Http400Exception('auth.username-duplicated');
      }
      console.log('No user -> Create new one');
      const newUser = await this.userService.create(data);
      return newUser;
    } catch (err) {
      throw new Http503Exception(err.message);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async validUser(@Req() data: iReqWithUser) {
    try {
      console.log(data);
      return data;
    } catch (err) {
      throw new Http503Exception(err.message);
    }
  }
}
