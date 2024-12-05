import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminComponent } from '../admin/admin.component'; // Asegúrate de importar el componente Admin

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  selectedFile: File | null = null; // Almacena el archivo seleccionado
  sidebarOpen = true; // Estado de la barra lateral

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminComponent: AdminComponent // Inyectamos el AdminComponent para acceder a addProject
  ) {
    this.projectForm = this.fb.group({
      description: ['', [Validators.required]],
      generalobjective: ['', [Validators.required]],
      projectdocument: ['', [Validators.required]], // Campo obligatorio
      totalsgr: ['', [Validators.required]],
      totalduration: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {}

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
      this.selectedFile = input.files[0]; // Guardar el archivo seleccionado
      console.log('Archivo seleccionado:', this.selectedFile);

      // Actualizar el campo "projectdocument" con el nombre del archivo
      this.projectForm.patchValue({ projectdocument: this.selectedFile.name });
      this.projectForm.get('projectdocument')?.updateValueAndValidity();
    }
  }

  /**
   * Guardar el proyecto y validarlo.
   */
  saveProject(): void {
    if (this.projectForm.valid && this.selectedFile) {
      // Extraemos el nombre del proyecto del formulario
      const projectName = this.projectForm.value.description; // Suponemos que la descripción es el nombre del proyecto
      console.log('Nuevo proyecto:', projectName);

      // Llamamos a `addProject` para agregar el proyecto a la lista de proyectos
      this.adminComponent.addProject({ name: projectName });

      // Redirigir al dashboard después de guardar
      alert('¡Proyecto guardado con éxito!');
      this.router.navigate(['/admin']);
    } else {
      alert('Por favor completa todos los campos y selecciona un archivo.');
    }
  }

  /**
   * Cancelar la acción y regresar al dashboard
   */
  cancel(): void {
    this.router.navigate(['/admin']); // Redirigir al dashboard
  }
}












