import { Injectable } from '@angular/core';

interface Project {
  id: number;
  name: string;
  description: string;
  generalobjective: string;
  projectdocument: string;
  totalsgr: string;
  totalduration: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [];

  constructor() {
    // Intentamos cargar los proyectos desde el localStorage
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects);
    }
  }

  // Obtener todos los proyectos
  getProjects(): Project[] {
    return this.projects;
  }

  // Obtener un proyecto por su ID
  getProjectById(id: number): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  // Agregar un nuevo proyecto
  addProject(newProject: Project): void {
    this.projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(this.projects)); // Guardamos los proyectos en localStorage
  }
}
