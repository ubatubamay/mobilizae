import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ajudas } from '../models/ajudas';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AjudasService {

  ajudaSelecionada: Ajudas;
  ajudas: Ajudas[];
  readonly URL_API = 'http://localhost:3000/api/ajudas';
  constructor(private http: HttpClient,
              private loginService: LoginService) {
    this.ajudaSelecionada = new Ajudas();
  }

  getAjudas() {
    return this.http.get<any>(this.URL_API);
  }

  getAjuda(id: string) {
    return this.http.get<any>(this.URL_API + `/${id}`);
  }

  postAjuda(ajuda: Ajudas): Observable<string> {
    let headers = new HttpHeaders();
    if (this.loginService.isLoggedIn()) {
      headers = headers.set('Authorization', 'Bearer ' + this.loginService.usuario.accessToken);
    }
    return this.http.post<Ajudas>(this.URL_API, ajuda, {headers: headers}).map(aj => ajuda._id);
  }

  putAjuda(ajuda: Ajudas) {
    return this.http.put(this.URL_API + `/${ajuda._id}`, ajuda);
  }

  deleteAjuda(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
