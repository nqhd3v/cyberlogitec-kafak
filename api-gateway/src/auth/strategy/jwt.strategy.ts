import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Http401Exception } from 'utils/Exception/http-401.exception';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        let token = null;
        if (req.query && req.query.access_token) {
          token = req.query.access_token;
        }
        if (!token && req.headers.authorization) {
          const parts = req.headers.authorization.split(' ');
          if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
          }
        }
        if (!token) {
          throw new Http401Exception('auth.token.invalid');
        }
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: { userId: string }) {
    const { userId } = payload;
    const account = await this.userService.getById(userId);
    if (!account) {
      throw new Http401Exception('account.notfound');
    }
    return account;
  }
}
