import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {
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
   * Guardar el proyecto y validar la selección del archivo.
   */
  saveProject(): void {
    if (this.projectForm.valid && this.selectedFile) {
      console.log('Datos del formulario:', this.projectForm.value);
      console.log('Archivo cargado:', this.selectedFile);

      alert('¡Proyecto guardado con éxito!');
      this.router.navigate(['/admin']); // Redirigir al dashboard
    } else {
      alert('Por favor completa todos los campos y selecciona un archivo.');
    }
  }

  /**
   * Cancelar la acción y regresar al dashboard.
   */
  cancel(): void {
    this.router.navigate(['/admin']); // Redirigir al dashboard
  }
}
