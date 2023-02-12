import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BadReqException } from 'utils/Exception/bad-request.exception';
import { AppService } from './app.service';
import CreateDto from './dto/create';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get-by-id')
  async handleGetById(@Payload() { id }: { id: string }): Promise<string> {
    try {
      const user = await this.appService.getById(id);
      if (!user) return undefined;
      return JSON.stringify(user);
    } catch (err) {
      throw new BadReqException(err.message);
    }
  }

  @MessagePattern('create-one')
  async handleCreateOne(@Payload() data: CreateDto): Promise<string> {
    try {
      console.log(' -- Create new user');
      const newUser = await this.appService.create(data);
      if (!newUser) return undefined;
      return JSON.stringify(newUser);
    } catch (err) {
      throw new BadReqException(err.message);
    }
  }

  @MessagePattern('get-by-fields')
  async handleGetByFields(
    @Payload() fields: Record<string, any>,
  ): Promise<string> {
    console.log(' -- Get user by fields');
    const data = await this.appService.getByFields(fields);
    if (!data) return undefined;
    return JSON.stringify(data);
  }
}
