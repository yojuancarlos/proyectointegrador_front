import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ProjectCardComponent } from '../components/project-card/project-card.component';
import { ProjectService } from '../services/project.service';
import { Project } from '../interfaces/project.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    ProjectCardComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-background to-muted">
      <app-header [toggleSidebar]="toggleSidebar.bind(this)" />
      
      <app-sidebar
        [isOpen]="sidebarOpen"
        [projects]="projects"
        [deleteProject]="deleteProject.bind(this)"
      />

      <main class="container mx-auto px-4 py-8 transition-all duration-200"
            [class.ml-64]="sidebarOpen">
        <div class="max-w-4xl mx-auto">
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <div class="text-center space-y-4">
              <h2 class="text-3xl font-bold tracking-tight">
                Bienvenido a tu Panel de Proyectos
              </h2>
              <p class="text-muted-foreground">
                Gestiona tus proyectos de manera eficiente y organizada
              </p>
              <button class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                      (click)="openNewProjectPage()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="mr-2">
                  <path d="M5 12h14"/>
                  <path d="M12 5v14"/>
                </svg>
                Crear Nuevo Proyecto
              </button>
            </div>
          </div>

          <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            @for (project of projects; track project.description) {
              <app-project-card
                [project]="project"
                (onView)="viewProjectDetail($event)"
                (onDelete)="deleteProject($event)"
              />
            }
          </div>
        </div>
      </main>
    </div>
  `
})
export class AdminComponent {
  sidebarOpen = true;
  projects: Project[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {
    this.projectService.projects$.subscribe(
      projects => this.projects = projects
    );
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openNewProjectPage(): void {
    this.router.navigate(['/admin/create-project']);
  }

  deleteProject(project: Project): void {
    this.projectService.deleteProject(project);
  }

  viewProjectDetail(project: Project): void {
    this.router.navigate(['/admin/project-detail', project.description]);
  }
}