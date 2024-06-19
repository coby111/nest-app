import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserCreateDto } from 'src/users/dto/create-user.dto';
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * Servicio para manejar la autenticacion de usuarios
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valida las credenciales del usuario
   * @param email - El email del usuario
   * @param pass - La contraseña del usuario
   * @returns El usuario sin la contraseña si las credenciales son correctas
   * @throws - Si el email o la contraseña son incorrectos
   */
  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    const { password, ...result } = user;
    return result;
  }

  /**
   * Genera el token de acceso para el usuario
   * @param user - El usuario autenticado
   * @returns El token de acceso
   */
  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Registra un nuevo usuario
   * @param userDto - Los datos del usuario a registrar
   * @returns - El usuario registrado
   * @throws - Si el usuario ya existe
   */
  async register(userDto: UserCreateDto): Promise<User> {
    const existingUser = await this.usersService.getUserByEmail(userDto.email);
    if (existingUser) {
      throw new ConflictException('El usuario ya existe, inicie sesión');
    }
    return await this.usersService.createUser(userDto);
  }
}
