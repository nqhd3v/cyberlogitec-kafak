import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import ValidPassDto from './dto/valid-password';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('valid-password')
  async handleValidPassword(@Payload() data: ValidPassDto): Promise<string> {
    console.log(data);
    const res = await this.appService.validPassword(data);
    return JSON.stringify(res);
  }
}
