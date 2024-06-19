import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Obtiene el perfil del usuario autenticado
   * @param req - La solicitud que contiene la informacion del usuario
   * @returns El perfil del usuario autenticado
   */
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
