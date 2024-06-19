import { AuthService } from './auth.service';
import { UserCreateDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

/**
 * Controlador paara la autenticacion de usuarios
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * egistra un nuevo usuario
   * @param createUserDto - Los datos del usuario a registrar
   * @returns El usuario creado
   */
  @Post('/signup')
  async signup(@Body() createUserDto: UserCreateDto) {
    return this.authService.register(createUserDto);
  }

  /**
   * Incio de sesion con credenciales de usuario
   * @param req - La solicitud http que contiene la informacion de autenticacion
   * @returns El token de acceso
   */
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
