import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class AdminComponent implements OnInit {
  sidebarOpen = true;

  tableData: any[] = [];
  tableHeaders: string[] = [];
  userFiles: string[] = []; // Lista de archivos subidos


  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  createProject(): void {
    alert('¡Funcionalidad para crear un proyecto próximamente!');
  }

  openNewProjectPage(): void {
    this.router.navigate(['/admin/create-project']); // Ruta correcta para la creación del proyecto

  }





}





