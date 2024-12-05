import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  projectId: number | undefined;
  project: any; // Datos del proyecto

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtenemos el ID del proyecto desde la URL
    this.projectId = +this.route.snapshot.paramMap.get('id')!;

    // Intentamos obtener el proyecto de la lista almacenada (simulando el backend)
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');

    // Buscamos el proyecto por su ID
    this.project = projects.find((p: any) => p.id === this.projectId);

    // Si no encontramos el proyecto, podemos redirigir o mostrar un mensaje de error
    if (!this.project) {
      console.error(`Proyecto con ID ${this.projectId} no encontrado.`);
      // Redirigir o mostrar un mensaje en la vista, dependiendo de tus preferencias
    }
  }
}
