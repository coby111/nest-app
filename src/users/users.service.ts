import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //Metodo para obtener un usuario por email y contraseña
  async getUserByEmailAndPassword(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
        active: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  //Metodo para registrar usuario
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
