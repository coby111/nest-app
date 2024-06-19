import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from '@nestjs/jwt';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * Guardia para auntenticacion con JWT
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Metodo para manejar la solicitud de autenticacion
   * @param err - Error que ocurre durante la autenticacion
   * @param user Usuario autenticado
   * @param info - Informacion adicional de autenticacion
   * @param _context - Contexto de ejecucion
   * @param _status - Estado de respuesta
   * @returns El usuario autenticado si es ecitoso, de lo contrario lanza una excepcion
   * @throws - Si el token es invalido o ha expirado
   */
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    _context: ExecutionContext,
    _status?: any,
  ): TUser {
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token ha expirado');
      } else {
        throw new UnauthorizedException('Token invalido');
      }
    }
    return user;
  }
}
