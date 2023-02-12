import { Injectable } from '@nestjs/common';
import ValidPassDto from './dto/valid-password';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  public async validPassword({
    encrypted,
    password,
  }: ValidPassDto): Promise<{ isOK: boolean }> {
    try {
      const isOK = await bcrypt.compare(password, encrypted);
      return { isOK };
    } catch (e) {
      console.error('Error when trying to compare password:', e);
      throw e;
    }
  }
}
