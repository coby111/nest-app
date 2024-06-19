import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

/**
 * Estrategia de autenticacion local para Passport
 */
@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
    this.authService = authService;
  }

  /**
   * Metodo para validar el usuario y la contraseña
   * @param email - El email del usuario
   * @param password - La contraseña del usuario
   * @returns El usuario validado
   * @throws Si las credenciales son incorrectas
   */
  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
