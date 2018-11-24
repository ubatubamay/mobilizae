import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Usuario } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  usuario: Usuario;

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.usuario !== undefined;
  }

  login (userData): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:3000/api/users/login/',
    {email: userData.email, password: userData.password}).do(usuario => this.usuario = usuario);
  }

}
