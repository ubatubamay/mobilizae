import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/users/register';
  private _loginUrl = 'http://localhost:3000/api/users/login';

  constructor(private http: HttpClient,
    private _router: Router) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  registraUsuario(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  // logoutUser() {
  //   localStorage.removeItem('token');
  //   this._router.navigate(['/']);
  // }

  logoutUser() {
    const url_api = 'http://localhost:3000/api/users/logout';
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return this.http.post<Usuario>(url_api, { headers: this.headers });
  }

  setUser(user: Usuario): void {
    const user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }
}
