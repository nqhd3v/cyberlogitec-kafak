import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ValidPassDto from './dto/valid-password';
import bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  public genToken(userId: string): { tokenAuth: string } {
    const tokenAuth = this.jwtService.sign({ userId });
    return {
      tokenAuth,
    };
  }

  async validPassword({
    encrypted,
    password,
  }: ValidPassDto): Promise<{ isOK: boolean }> {
    try {
      const isOK = await bcrypt.compare(password, encrypted);
      return { isOK };
    } catch (e) {
      throw e;
    }
  }
}
