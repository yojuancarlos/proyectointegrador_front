import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../project.model';  // Importamos la interfaz Project
import { ProjectService } from '../project.service'; // Importamos el servicio

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  // Definir 'projects' como un array de 'Project'
  projects: Project[] = [];  // Ahora TypeScript sabe que 'projects' es un array de 'Project'

  sidebarOpen = true;

  constructor(
    private router: Router,
    private projectService: ProjectService  // Inyectamos el servicio
  ) {}

  ngOnInit(): void {
    // Cargar los proyectos desde el servicio
    this.projects = this.projectService.getProjects();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  viewProjectDetails(projectId: number): void {
    this.router.navigate([`/admin/project/${projectId}`]);
  }

  openNewProjectPage(): void {
    this.router.navigate(['/admin/create-project']);
  }
}
