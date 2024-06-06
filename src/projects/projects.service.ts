import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Project } from '@prisma/client';

@Injectable()
export class ProjectsService {
  //Instamcia de prisma
  constructor(private prisma: PrismaService) {}

  /**
   * *Metodo para registrar un nuevo proyecto
   * @param data Datos del proyecto a registrar
   * @returns Proyecto registrado
   */
  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({
      data,
    });
  }

  /**
   * *Metodo para consultar todos los proyectos
   * @returns Retorna los todos los proyectos registrados
   */
  async findAll() {
    return await this.prisma.project.findMany();
  }

  /**
   * *Mertodo para consultar un proyecto a partir del id
   * @param id id del proyecto a consultar
   * @returns Retorna el proyecto con el id correspondiente
   */
  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
  }

  /**
   * *Metodo para actualizar un proyecto mediante su id
   * @param id id del proyecto a actualizar
   * @param updateProjectDto Datos del proyecto a actualizar
   * @returns Retorna el proyecto actualizado
   */
  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const existingProject = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      throw new NotFoundException(`Project with ${id} not found`);
    }

    return await this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  /**
   * *Metodo para eliminar un proyecto
   * @param id id del proyecto a eliminar
   * @returns Retorna un mensaje despues de eliminar un proyecto
   */
  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
