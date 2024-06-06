import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

/**
 * Ruta del raiz del proyecto
 * *http://localhost:3000/projects
 */
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * Crea un nuevo proyecto
   * @param createProjectDto Datos del proyecto a crear
   * @returns Retorna el proyecto creado
   */
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create({ ...createProjectDto });
  }

  /**
   * Obtiene todos los proyectos
   * @returns Retorna los proyectos
   */
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  /**
   * Obtiene un proyecto mediante su id
   * @param id id del proyecto a obtener
   * @returns Retorna el proyecto encontrado
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  /**
   * Actualiza un proyecto mediante su id
   * @param id id del proyecto a actualizar
   * @param updateProjectDto Datos del proyecto a actualizar
   * @returns Retorna el proyeto actualizado
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  /**
   * Elimina un proyecto mediante su id
   * @param id id del proyecto a elimaniar
   * @returns Retorna el id del proyecto eliminado
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
