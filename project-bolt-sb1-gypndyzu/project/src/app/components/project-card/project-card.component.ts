import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '@/app/interfaces/project.interface';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-card rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow">
      <div class="space-y-2">
        <h3 class="font-semibold truncate">{{ project.description }}</h3>
        <p class="text-sm text-muted-foreground truncate">
          {{ project.generalobjective }}
        </p>
        <div class="flex justify-end gap-2 mt-4">
          <button class="px-3 py-1 text-sm border rounded-md hover:bg-muted/50 transition-colors"
                  (click)="onView.emit(project)">
            Ver Detalles
          </button>
          <button class="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                  (click)="onDelete.emit(project)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="inline-block">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() onView = new EventEmitter<Project>();
  @Output() onDelete = new EventEmitter<Project>();
}