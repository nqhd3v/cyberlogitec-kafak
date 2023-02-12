import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Http503Exception } from 'utils/Exception/http-503.exception';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/user/user.service';
import LoginDto from './dto/login';
import { User } from 'src/user/entities/user';
import { Http400Exception } from 'utils/Exception/http-400.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientKafka,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async handleLogin(data: LoginDto): Promise<User> {
    try {
      const user = await this.userService.getByFields({
        username: data.username,
      });
      if (!user) {
        throw new Http400Exception('auth.user.notfound');
      }
      const isPasswordOK = await this.validPassword(
        data.password,
        user.password,
      );
      if (!isPasswordOK) {
        throw new Http400Exception('auth.user.notfound');
      }
      return user;
    } catch (err) {
      throw new Http503Exception(err.message);
    }
  }

  async validPassword(
    password: string,
    encrypted: string,
  ): Promise<{ isOK: boolean }> {
    try {
      return await lastValueFrom(
        this.authClient.send(
          'valid-password',
          JSON.stringify({ password, encrypted }),
        ),
      );
    } catch (err) {
      throw err;
    }
  }

  public genAuthToken(fieldValues: Partial<User>): string {
    const tokenAuth = this.jwtService.sign(fieldValues);
    return tokenAuth;
  }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('valid-password');
    await this.authClient.connect();
  }
}
