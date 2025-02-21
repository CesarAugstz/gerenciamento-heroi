import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Heroi } from '../models/heroi.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class HeroiService extends BaseService {
  private endpoint = 'api/herois';

  constructor(http: HttpClient) {
    super(http);
  }

  getHerois(): Observable<Heroi[]> {
    return this.http
      .get<Heroi[]>(`${this.apiUrl}/${this.endpoint}`)
      .pipe(catchError(this.tratarErro));
  }

  adicionarHeroi(heroi: Heroi): Observable<Heroi> {
    return this.http
      .post<Heroi>(`${this.apiUrl}/${this.endpoint}`, heroi)
      .pipe(catchError(this.tratarErro));
  }

  atualizarHeroi(heroi: Heroi): Observable<Heroi> {
    return this.http
      .put<Heroi>(`${this.apiUrl}/${this.endpoint}/${heroi.id}`, heroi)
      .pipe(catchError(this.tratarErro));
  }

  excluirHeroi(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${this.endpoint}/${id}`)
      .pipe(catchError(this.tratarErro));
  }
}
