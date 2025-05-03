import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Get,
  Query,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // findAll(@Query('search') search?: string) {
  //   return this.userService.findAll(search);
  // }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
  ) {
    return this.userService.findAll(+page, +limit, search);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const deleted = await this.userService.delete(id);
    if (!deleted) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'User deleted successfully' };
  }
}
