import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule si necesitas directivas como *ngIf y *ngFor

@Component({
  selector: 'app-create-project',
  standalone: true, // Este es un componente standalone
  imports: [ReactiveFormsModule, CommonModule], // Importa ReactiveFormsModule aquí
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService
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

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0]; // Guardamos el archivo seleccionado
      this.projectForm.patchValue({ projectdocument: this.selectedFile.name });
    }
  }

  saveProject(): void {
    if (this.projectForm.valid && this.selectedFile) {
      const newProject = {
        ...this.projectForm.value,
        id: Date.now(), // Generar ID único
        projectdocument: this.selectedFile.name, // Guardar nombre del archivo
      };

      this.projectService.addProject(newProject); // Usar el servicio para guardar el proyecto

      alert('¡Proyecto guardado con éxito!');
      this.router.navigate(['/admin']);
    } else {
      alert('Por favor completa todos los campos y selecciona un archivo.');
    }
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}
