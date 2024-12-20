import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Redirección inicial
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  { path: 'user', loadComponent: () => import('./user/user.component').then(m => m.UserComponent) },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) },
  { path: 'admin/project-detail/:description',
    loadComponent: () => import('./project-detail/project-detail.component').then(m => m.ProjectDetailComponent)
  },
  {
    path: 'admin/create-project',
    loadComponent: () => import('./create-project/create-project.component').then(m => m.CreateProjectComponent)
  }, // Ruta para crear un proyecto
  { path: '**', redirectTo: 'auth/login' }, // Redirección por defecto
];

