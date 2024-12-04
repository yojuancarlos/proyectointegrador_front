
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://backend-regalias.onrender.com/api/v1';

  constructor(private http: HttpClient) {} // Inyectar HttpClient

  // Método para registrar un usuario
  register(user: { user: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Método para iniciar sesión
  login(data: { username: string; password: string }): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', data.username);
    body.set('password', data.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(`${this.apiUrl}/login`, body.toString(), { headers });
  }


}
