import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  projects = [
    // Simulando algunos proyectos iniciales
    { id: 1, name: 'Proyecto A' },
    { id: 2, name: 'Proyecto B' },
  ];
  sidebarOpen = true;

  tableData: any[] = [];
  tableHeaders: string[] = [];
  userFiles: string[] = []; // Lista de archivos subidos


  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  createProject(): void {
    alert('¡Funcionalidad para crear un proyecto próximamente!');
  }

  openNewProjectPage(): void {
    this.router.navigate(['/admin/create-project']); // Asegúrate de que esta ruta sea correcta
  }

   // Método para navegar a la página de detalles del proyecto
   viewProjectDetails(projectId: number): void {
    this.router.navigate([`/admin/project/${projectId}`]);
  }



  // Método para agregar un nuevo proyecto a la lista
  addProject(newProject: { name: string }): void {
    const newProjectId = this.projects.length + 1; // Generar un ID único
    this.projects.push({ id: newProjectId, name: newProject.name });
  }

}





























