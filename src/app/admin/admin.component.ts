import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  sidebarOpen = true;
  projects: any[] = []; // Lista de proyectos almacenados

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadProjects(); // Cargar los proyectos cuando la página se inicia
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openNewProjectPage(): void {
    this.router.navigate(['/admin/create-project']); // Navegar a la página de creación de proyecto
  }

  loadProjects(): void {
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    if (storedProjects.length > 0) {
      this.projects = storedProjects;
    } else {
      console.log('No hay proyectos guardados en localStorage');
    }
  }

  // Esta función se llama cuando se hace clic en un proyecto de la lista
  viewProjectDetail(project: any): void {
    console.log('Proyecto seleccionado:', project); // Verifica si el proyecto tiene una descripción correctamente
    this.router.navigate(['/admin/project-detail', project.description]);
  }

   // Función para eliminar un proyecto
   deleteProject(project: any): void {
    // Filtrar el proyecto a eliminar
    this.projects = this.projects.filter(p => p !== project);

    // Actualizar el localStorage con los proyectos restantes
    localStorage.setItem('projects', JSON.stringify(this.projects));

    // Opcionalmente, puedes agregar un mensaje de confirmación
    alert(`Proyecto "${project.description}" eliminado con éxito`);
  }


}
