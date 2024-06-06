import { Injectable } from '@nestjs/common';
// import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Project } from '@prisma/client';

@Injectable()
export class ProjectsService {
  //Instamcia de prisma
  constructor(private prisma: PrismaService) {}

  /**
   * Metodo para registrar un nuevo proyecto
   * @param data Datos del proyecto a registrar
   * @returns Proyecto registrado
   */
  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({
      data,
    });
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
