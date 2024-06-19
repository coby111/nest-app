import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from './../../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

/**
 * Estrategia JWT para Passport
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_JWT || 'secretKey',
    });
  }

  /**
   * Metodo para validar el token y el usuario asociado
   * @param payload - El payload del token JWT
   * @returns El usuario validado
   * @throws Si el payload es invalido o no se encuentra el usuario
   */
  async validate(payload: any) {
    const user = await this.userService.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const { password, ...result } = user;
    return result;
  }
}
