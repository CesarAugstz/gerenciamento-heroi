import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Heroi, Superpoder } from '../../models/heroi.model';

@Injectable({
  providedIn: 'root',
})
export class HeroiService extends BaseService {
  private endpoint = this.apiUrl + '/api/herois';

  constructor(http: HttpClient) {
    super(http);
  }

  getHerois(): Observable<Heroi[]> {
    return this.http
      .get<Heroi[]>(`${this.endpoint}`)
      .pipe(catchError(this.tratarErro));
  }

  adicionarHeroi(heroi: Heroi): Observable<Heroi> {
    return this.http
      .post<Heroi>(`${this.endpoint}`, heroi)
      .pipe(catchError(this.tratarErro));
  }

  atualizarHeroi(heroi: Heroi): Observable<Heroi> {
    return this.http
      .put<Heroi>(`${this.endpoint}/${heroi.id}`, heroi)
      .pipe(catchError(this.tratarErro));
  }

  excluirHeroi(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.endpoint}/${id}`)
      .pipe(catchError(this.tratarErro));
  }

  searchHerois(searchTerm: string): Observable<Heroi[]> {
    return this.http
      .get<Heroi[]>(`${this.endpoint}/search`, {
        params: { term: searchTerm },
      })
      .pipe(catchError(this.tratarErro));
  }
}
