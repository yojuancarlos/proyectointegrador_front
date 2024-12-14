import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  projects$ = this.projectsSubject.asObservable();

  constructor() {
    this.loadProjects();
  }

  private loadProjects(): void {
    const stored = localStorage.getItem('projects');
    if (stored) {
      this.projectsSubject.next(JSON.parse(stored));
    }
  }

  deleteProject(project: Project): void {
    const currentProjects = this.projectsSubject.value;
    const updatedProjects = currentProjects.filter(p => p !== project);
    this.projectsSubject.next(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  }

  addProject(project: Project): void {
    const currentProjects = this.projectsSubject.value;
    const updatedProjects = [...currentProjects, project];
    this.projectsSubject.next(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  }
}