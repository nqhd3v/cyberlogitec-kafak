import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import CreateDto from './dto/create';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Get all terminals
  @MessagePattern('get')
  async getAll() {
    try {
      const res = await this.appService.getAll();
      return JSON.stringify(res);
    } catch (err) {
      throw err;
    }
  }

  // Create a new terminal
  @MessagePattern('create-one')
  async createOne(@Payload() data: CreateDto) {
    try {
      const res = await this.appService.createTerminal(data);
      return JSON.stringify(res);
    } catch (err) {
      throw err;
    }
  }
}
