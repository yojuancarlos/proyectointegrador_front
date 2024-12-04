import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (!this.loginForm.valid) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const { user, password } = this.loginForm.value;

    this.authService.login({ username: user, password }).subscribe({
      next: (response) => {
        console.log('Token recibido:', response.access_token);
        const token = response.access_token;

        if (token) {
          alert(`Bienvenido, ${user}`);
          this.router.navigate(['/admin']); // Asegúrate de que /admin esté definido en tus rutas
        } else {
          alert('Inicio de sesión fallido. Inténtalo nuevamente.');
        }
      },
      error: (err) => {
        alert('Error en el inicio de sesión. Por favor verifica tus credenciales.');
        console.error(err);
        //this.router.navigate(['/admin']);
      },
    });
  }
}
