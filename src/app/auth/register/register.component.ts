import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { user, password } = this.registerForm.value;
      const data ={
        id: 0,
        nombre: user,
        password: password
        
      }

      this.authService.register({ user, password }).subscribe({
        next: () => {
          alert('Registro exitoso. Ahora puedes iniciar sesión.');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          alert('Error al registrar. Por favor intenta nuevamente.');
          console.error(err);
        },
      });
    }
  }
}
