// create-project.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule], // Importar CommonModule

  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  selectedFile: File | null = null; // Almacena el archivo seleccionado
  sidebarOpen = true; // Estado de la barra lateral
  projects: any[] = []; // Lista de proyectos almacenados
  storedProject: any = null; // Datos del proyecto guardado en localStorage

  constructor(private fb: FormBuilder, private router: Router) {
    this.projectForm = this.fb.group({
      description: ['', [Validators.required]],
      generalobjective: ['', [Validators.required]],
      projectdocument: ['', [Validators.required]], // Campo obligatorio
      totalsgr: ['', [Validators.required]],
      totalduration: [0, [Validators.required, Validators.min(1)]],
    });
  }
  ngOnInit(): void {
    this.loadProjects(); // Cargar los proyectos cuando la página se inicia
  }

  /**
   * Alternar el estado de la barra lateral
   */
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /**
   * Manejar la selección de un archivo.
   * @param event Evento del input file
   */
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0]; // Obtener el archivo seleccionado
      this.selectedFile = file; // Guardar el archivo seleccionado

      const reader = new FileReader(); // Crear un lector de archivos

      reader.onloadend = () => {
        // Al finalizar la lectura, guardamos el archivo en base64
        const fileBase64 = reader.result as string;

        // Puedes hacer algo con el archivo base64 aquí si es necesario
        console.log('Archivo cargado como base64:', fileBase64);

        // Actualizar el campo del formulario con el nombre del archivo
        this.projectForm.patchValue({ projectdocument: file.name });
      };

      reader.readAsDataURL(file); // Leer el archivo como base64
    }
  }


  /**
   * Guardar el proyecto y validar la selección del archivo.
   */



  saveProject(): void {
    if (this.projectForm.valid && this.selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convertimos el archivo a base64
        const base64File = reader.result as string; // Esto es base64

        const newProject = this.projectForm.value;
        newProject.projectdocument = base64File; // Guardar el archivo en base64 en el campo 'projectdocument'

        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        storedProjects.push(newProject);

        // Guardar los proyectos con el archivo base64
        localStorage.setItem('projects', JSON.stringify(storedProjects));

        alert('¡Proyecto guardado con éxito!');
        this.router.navigate(['/admin']); // Regresar al admin después de guardar el proyecto
      };

      // Leemos el archivo como base64
      reader.readAsDataURL(this.selectedFile); // Esto convierte el archivo a base64
    } else {
      alert('Por favor completa todos los campos.');
    }
  }




  viewProjectDetail(project: any): void {
    console.log('Proyecto seleccionado:', project); // Verifica si el proyecto tiene una descripción correctamente
    this.router.navigate(['/admin/project-detail', project.description]);
  }



  /**
   * Cargar el proyecto desde localStorage
   */
  loadProjects(): void {
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    if (storedProjects.length > 0) {
      this.projects = storedProjects;
    } else {
      console.log('No hay proyectos guardados en localStorage');
    }
  }

  /**
   * Cancelar la acción y regresar al dashboard.
   */
  cancel(): void {
    this.router.navigate(['/admin']); // Redirigir al dashboard
  }
}
