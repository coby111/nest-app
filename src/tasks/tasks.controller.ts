/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Task, TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

//locashts/tasks
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  //GET: /tasks/ (INDEX)
  //? http://localhost:3000/tasks
  @Get()
  getTasks(): Task[] {
    return this.tasksService.getTasks();
  }

  //POST: /tasks/ (CREATE)
  //? http://localhost:3000/tasks
  @Post()
  createTask(@Body() newTask: createTaskDto): Task {
    return this.tasksService.createTask(newTask as Task);
  }

  // PUT: /tasks/id (UPDATE)
  //? http://localhost:3000/tasks/1
  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto):
    Task {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  // DELETE: /tasks/:id (DELETE)
  //? http://localhost:3000/tasks/?id=4
  @Delete()
  deleteTask(
    @Query('id', ParseIntPipe) id: number): 
    { message: string } {
    this.tasksService.deleteTask(id);
    return { message: `la tarea con el id: ${id} ha sido eliminada ` };
  }
}
