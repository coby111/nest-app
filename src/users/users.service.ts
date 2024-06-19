import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene un usuario por email si está activo
   * @param email - El email del usuario
   * @returns El usuario si se encuentra
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
        active: true,
      },
    });
  }

  /**
   * Registra un nuevo usuario con la contraseña encriptada
   * @param data - Los datos del usuario
   * @returns El usuario creado
   * @throws - Si el correo ya está registrado
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.getUserByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  /**
   * Encuentra a un usuario por su ID
   * @param userId - El ID del usuario
   * @returns El usuario si se encuentra
   * @throws Si el usuario no se encuentra
   */
  async findUserById(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }
}
