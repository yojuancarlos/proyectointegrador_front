import { CommonModule } from '@angular/common'; // Importar CommonModule
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el parámetro 'description' de la ruta
    const projectDescription = this.route.snapshot.paramMap.get('description');

    if (projectDescription) {
      // Recuperar los proyectos de localStorage
      const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      this.project = storedProjects.find((proj: any) => proj.description === projectDescription); // Buscar el proyecto por descripción
    } else {
      console.error('Error: No se encontró el parámetro "description" en la URL');
    }
  }
}


