import { CommonModule } from '@angular/common';
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
  sidebarOpen = true;
  currentTab: string = '';
  excelData: any = {};
  tabs: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
    const projectDescription = this.route.snapshot.paramMap.get('description');

    if (projectDescription) {
      const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      this.project = storedProjects.find((proj: any) => proj.description === projectDescription);

      if (this.project && this.project.projectdocument) {
        this.readExcelFile(this.project.projectdocument);
      }
    } else {
      console.error('Error: No se encontró el parámetro "description" en la URL');
    }
  }

  readExcelFile(fileContent: string): void {
    try {
      if (!fileContent || !fileContent.startsWith('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,')) {
        console.error('El archivo no está en formato base64 válido.');
        return;
      }

      const base64String = fileContent.split(',')[1];
      const binaryString = atob(base64String);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const workbook = XLSX.read(bytes, { type: 'array' });
      this.tabs = workbook.SheetNames;

      this.tabs.forEach(tab => {
        this.excelData[tab] = XLSX.utils.sheet_to_json(workbook.Sheets[tab], { header: 1 });
      });

      this.currentTab = this.tabs[0];
    } catch (error) {
      console.error('Error al leer el archivo Excel:', error);
    }
  }

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

  viewProjectDetail(project: any): void {
    this.router.navigate(['/admin/project-detail', project.description]);
  }

  updateCell(rowIndex: number, colIndex: number, event: Event): void {
    // Aseguramos que el event.target sea un HTMLInputElement
    const inputElement = event.target as HTMLInputElement;

    // Validamos que la pestaña actual existe antes de acceder a ella
    if (this.currentTab && this.excelData[this.currentTab]) {
      this.excelData[this.currentTab][rowIndex + 1][colIndex] = inputElement.value;
      console.log(`Celda actualizada [${rowIndex}, ${colIndex}]: ${inputElement.value}`);
    }
  }


  saveChanges(): void {
    console.log('Datos actualizados:', this.excelData);
    localStorage.setItem('excelData', JSON.stringify(this.excelData));
  }
}
