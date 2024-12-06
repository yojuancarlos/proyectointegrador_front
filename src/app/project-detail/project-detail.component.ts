import { CommonModule } from '@angular/common'; // Importar CommonModule

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: any = null;
  sidebarOpen = true; // Estado de la barra lateral
  currentTab: string = ''; // Para rastrear la pestaña seleccionada
  excelData: any = {}; // Para almacenar el contenido de las pestañas del Excel
  tabs: string[] = []; // Para almacenar los nombres de las pestañas

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.loadProjects(); // Cargar los proyectos cuando la página se inicializa
    const projectDescription = this.route.snapshot.paramMap.get('description');

    if (projectDescription) {
      const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      this.project = storedProjects.find((proj: any) => proj.description === projectDescription); // Buscar el proyecto por descripción

      if (this.project && this.project.projectdocument) {
        // Leer el archivo Excel cuando el proyecto tiene un archivo cargado
        this.readExcelFile(this.project.projectdocument);
      }
    } else {
      console.error('Error: No se encontró el parámetro "description" en la URL');
    }
  }

  // Función para leer el archivo Excel
  readExcelFile(fileContent: string): void {
    try {
      // Primero verificamos si la cadena es válida
      if (!fileContent || !fileContent.startsWith('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,')) {
        console.error('El archivo no está en formato base64 válido.');
        return;
      }

      // Decodificar la cadena base64 (eliminando el prefijo data URL)
      const base64String = fileContent.split(',')[1]; // Extraer solo la parte base64
      const binaryString = atob(base64String); // Decodificar base64 a binario

      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      // Copiar la cadena binaria a un Uint8Array
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Leer el archivo Excel usando XLSX
      const workbook = XLSX.read(bytes, { type: 'array' });

      // Obtener las pestañas (hojas) del archivo Excel
      this.tabs = workbook.SheetNames;

      // Almacenar el contenido de las pestañas en un objeto
      this.tabs.forEach(tab => {
        this.excelData[tab] = XLSX.utils.sheet_to_json(workbook.Sheets[tab], { header: 1 });
      });

      // Establecer la pestaña activa a la primera
      this.currentTab = this.tabs[0];
    } catch (error) {
      console.error('Error al leer el archivo Excel:', error);
    }
  }

  // Función para cambiar la pestaña activa
  changeTab(tab: string): void {
    this.currentTab = tab;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  loadProjects(): void {
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    if (storedProjects.length > 0) {
      this.project = storedProjects;
    } else {
      console.log('No hay proyectos guardados en localStorage');
    }
  }

  // Esta función se llama cuando se hace clic en un proyecto de la lista
  viewProjectDetail(project: any): void {
    console.log('Proyecto seleccionado:', project); // Verifica si el proyecto tiene una descripción correctamente
    this.router.navigate(['/admin/project-detail', project.description]);
  }
}






























