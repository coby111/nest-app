import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  /**
   * *Metodo para registrar una nueva tarea
   * @param data Datos de la tarea a registrar
   * @returns Retorna la tarea registrada
   */
  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  /**
   * Funcion para retornar la lista de tareas
   * @returns
   */
  async findAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async byId(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Tarea con id ${id}, no encontrada`);
    }
    return task;
  }

  async findOneTask(id: number): Promise<Task> {
    await this.byId(id);

    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return task;
  }

  /**
   * Actualizar tarea
   * @param id
   * @param updateTaskDto
   * @returns tarea actualizada
   */
  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.prisma.task.update({
      data: { ...updateTaskDto } as any,
      where: { id },
    });
  }

  /**
   * Eliminar tarea
   * @param id
   */
  async deleteTask(id: number): Promise<Task> {
    return await this.prisma.task.delete({ where: { id } });
  }
}
