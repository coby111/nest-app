/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

/**
 * Ruta del raiz del proyecto
 * *http://localhost:3000/tasks
 */
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Crea una nueva tarea
   * @param newTask Datos de la tarea a crear
   * @returns Retorna la tarea creada.
   */
  @Post()
  createTask(@Body() newTask: createTaskDto): Promise<Task> {
    return this.tasksService.createTask({ ...newTask } as any);
  }

  /**
   * Obtiene todas las tareas
   * @returns Retorna las tareas
   */
  @Get()
  findAllTasks() {
    return this.tasksService.findAllTasks();
  }

  /**
   * Obtiene un proyecto mediante su id
   * @param id id del proyecto a obtener
   * @returns Retorna el proyecto encotrado
   */
  @Get(':id')
  findOneTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOneTask(id);
  }

  /**
   * Actualiza la tarea mediante su id
   * @param id ide de la tarea a actualizar
   * @param updateTaskDto Datos de la tarea a actulizar
   * @returns Retorna la tarea actualizada
   */
  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number): { message: string } {
    this.tasksService.deleteTask(id);
    return { message: `la tarea con el id: ${id} ha sido eliminada ` };
  }
}
