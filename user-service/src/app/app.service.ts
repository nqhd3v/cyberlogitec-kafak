import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user';
import { Repository } from 'typeorm';
import CreateDto from './dto/create';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  public async get() {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('u')
      .where('u.id = :id', { id })
      .getOne();
  }

  async getByFields(fieldValues: Record<string, string>): Promise<User> {
    // Create query str
    try {
      const fieldKeys = Object.keys(fieldValues);
      const whereQuery = fieldKeys.map((k) => `${k} = :${k}`).join(' OR ');
      return await this.userRepository
        .createQueryBuilder('acc')
        .where(`(${whereQuery})`, fieldValues)
        .getOne();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async create(user: CreateDto): Promise<User> {
    const password = await this.encryptedPwd(user.password);
    const newAccount = this.userRepository.create({
      ...user,
      password,
    });
    return await this.userRepository.save(newAccount);
  }

  // public async updateInfo(
  //   account: User,
  //   { displayname }: UpdateUserDto,
  // ): Promise<User> {
  //   account.displayname = displayname;
  //   return await this.userRepository.save(account);
  // }

  // public async updatePassword(account: User, newPassword: string) {
  //   const encryptedPwd = await this.encryptedPwd(newPassword);
  //   account.password = encryptedPwd;
  //   return await this.userRepository.save(account);
  // }

  private async encryptedPwd(password: string): Promise<string> {
    const hashSalt =
      this.configService.get('PASS_HASH_SALT') ||
      this.configService.get('DEFAULT_PASS_HASH_SALT');
    const encryptedPassword = await bcrypt.hash(password, Number(hashSalt));
    return encryptedPassword;
  }
}
