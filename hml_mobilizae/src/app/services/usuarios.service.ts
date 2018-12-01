import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Usuario } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  readonly URL_API = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }



}
