/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

export type Task = {
  id: number;
  description: string;
  date: Date;
  completed?: boolean;
};

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      description: 'Task 1',
      date: new Date(),
      completed: false,
    },
    {
      id: 2,
      description: 'Task 2',
      date: new Date(),
      completed: false,
    },
    {
      id: 3,
      description: 'Task 3',
      date: new Date(),
      completed: false,
    },
  ];

  /**
   * Funcion para retornar la lista de tareas
   * @returns
   */
  getTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Crear tarea
   * @param task 
   * @returns tarea creada
   */
  createTask(task: Task): Task {
    const taskData = {
      id: this.tasks.length + 1,
      ...task
    }
    this.tasks.push(taskData);

    return taskData;
  }

  /**
   * Actualizar tarea
   * @param id 
   * @param updateTaskDto 
   * @returns tarea actualizada
   */
  updateTask(id: number, updateTaskDto: Partial<Task>): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`La tarea con el id: ${id} no existe!`);
    }
    Object.assign(task, updateTaskDto);
    return task;
  }

  /**
   * Eliminar tarea
   * @param id 
   */
  deleteTask(id: number): void {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`La tarea con el id: ${id} no existe!!!`);
    }
    this.tasks.splice(taskIndex, 1);
  }
  
}
