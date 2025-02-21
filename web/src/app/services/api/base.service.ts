import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected apiUrl = environment.apiUrl

  constructor(protected http: HttpClient) {
    if (!this.apiUrl) throw new Error('API_URL não definida');
  }

  protected tratarErro(error: unknown) {
    if (error instanceof Error) {
      console.error('Ocorreu um erro:', error.message);
      return throwError(() => error);
    }

    console.error('Ocorreu um erro desconhecido:', error);
    return throwError(
      () => new Error('Ocorreu um erro desconhecido', { cause: error })
    );
  }
}
