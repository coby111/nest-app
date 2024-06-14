import { UsersService } from './../users/users.service';
import { UserCreateDto } from '../users/dto/create-user.dto';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private usersSerevices: UsersService) {}
  //POST: /login
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('/signup')
  create(@Body() userData: UserCreateDto) {
    return this.usersSerevices.createUser({ ...userData });
  }
}
