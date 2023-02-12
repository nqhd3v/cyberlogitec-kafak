import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import UpdateUserDto from './dto/update-user';
import { User } from './entities/user';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all account in system
  @Get()
  getAll() {
    return this.userService.get();
  }

  // Get account by id
  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return this.userService.getById(id);
  }

  // @Patch(':id')
  // async updateInformation(
  //   @Param('id') id: string,
  //   @Body() data: UpdateUserDto,
  // ) {
  //   try {
  //     return this.userService.updateInfo(id, data);
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
