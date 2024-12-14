import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '@/app/interfaces/project.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="fixed inset-y-0 left-0 bg-background border-r w-64 transform transition-transform duration-200 ease-in-out"
           [class.translate-x-0]="isOpen"
           [class.translate-x-[-100%]]="!isOpen">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-4">Proyectos Creados</h3>
        @if (projects.length === 0) {
          <p class="text-muted-foreground text-sm">No hay proyectos creados</p>
        } @else {
          <ul class="space-y-2">
            @for (project of projects; track project.description) {
              <li class="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span class="text-sm truncate flex-1">{{ project.description }}</span>
                <button class="text-destructive hover:bg-destructive/10 p-1 rounded"
                        (click)="deleteProject(project)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                </button>
              </li>
            }
          </ul>
        }
      </div>
    </aside>
  `
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() projects: Project[] = [];
  @Input() deleteProject!: (project: Project) => void;
}