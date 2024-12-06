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
    this.loadProject(); // Cargar el proyecto si está en localStorage
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
    if (this.projectForm.valid) {
      const newProject = this.projectForm.value;
      const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');

      // Añadir el nuevo proyecto a la lista
      storedProjects.push(newProject);

      // Guardar el array de proyectos de nuevo en localStorage
      localStorage.setItem('projects', JSON.stringify(storedProjects));

      alert('¡Proyecto guardado con éxito!');
      this.router.navigate(['/admin']); // Regresar al admin después de guardar el proyecto
    } else {
      alert('Por favor completa todos los campos.');
    }
  }



  /**
   * Cargar el proyecto desde localStorage
   */
  loadProject(): void {
    const storedData = localStorage.getItem('project');
    if (storedData) {
      this.storedProject = JSON.parse(storedData);
    }
  }

  /**
   * Cancelar la acción y regresar al dashboard.
   */
  cancel(): void {
    this.router.navigate(['/admin']); // Redirigir al dashboard
  }
}
