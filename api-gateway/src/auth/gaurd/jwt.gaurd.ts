import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Http400Exception } from 'utils/Exception/http-400.exception';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      throw new Http400Exception(err.response?.msg || err.message, { status });
    }
    return user;
  }
}
