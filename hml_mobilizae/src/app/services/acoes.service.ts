import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Acoes, IAcoesResponse} from '../models/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http: HttpClient) { }

  search(filter: {name: string} = {name: ''}, page = 1): Observable<IAcoesResponse> {
    return this.http.get<IAcoesResponse>('/api/users')
    .pipe(
      tap((response: IAcoesResponse) => {
        response.results = response.results
          .map(acao => new Acoes(acao.id, acao.name))
          // Not filtering in the server since in-memory-web-api has somewhat restricted api
          .filter(acao => acao.name.includes(filter.name));

        return response;
      })
      );
  }

}
