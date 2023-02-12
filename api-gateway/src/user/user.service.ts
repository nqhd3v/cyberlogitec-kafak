import { Inject, Injectable } from '@nestjs/common';
import UserDto from './dto/user';
import { User } from './entities/user';
import { ClientKafka } from '@nestjs/microservices';
import { Http503Exception } from 'utils/Exception/http-503.exception';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MICROSERVICE')
    private readonly userClient: ClientKafka,
  ) {}

  public async get(): Promise<User[]> {
    return lastValueFrom(this.userClient.emit('get_all_users', ''));
  }

  async getById(id: string) {
    return await lastValueFrom(
      this.userClient.emit('get_by_id', JSON.stringify({ id })),
    );
  }

  async getByFields(fieldValues: Record<string, string>): Promise<User | null> {
    try {
      return await lastValueFrom(
        this.userClient.send('get-by-fields', JSON.stringify(fieldValues)),
      );
    } catch (err) {
      throw new Http503Exception();
    }
  }

  public async create(user: UserDto): Promise<User> {
    try {
      return await lastValueFrom(
        this.userClient.send('create-one', JSON.stringify(user)),
      );
    } catch (err) {
      throw new Http503Exception();
    }
  }

  async onModuleInit() {
    this.userClient.subscribeToResponseOf('get-by-fields');
    this.userClient.subscribeToResponseOf('create-one');
    await this.userClient.connect();
  }
  // public async updateInfo(userId: string, data: UpdateUserDto): Promise<User> {
  //   return lastValueFrom(
  //     this.userClient.send(
  //       'update_by_id',
  //       JSON.stringify({ id: userId, data }),
  //     ),
  //   );
  // }
}
