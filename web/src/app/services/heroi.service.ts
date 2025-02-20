import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Heroi } from '../models/heroi.model';

@Injectable({
  providedIn: 'root'
})
export class HeroiService {
  private herois: Heroi[] = [
    { id: 1, nome: 'Bruce Wayne', nomeHeroi: 'Batman', altura: 1.88, peso: 95 },
    { id: 2, nome: 'Clark Kent', nomeHeroi: 'Superman', altura: 1.91, peso: 107 }
  ];

  constructor() { }

  getHerois(): Observable<Heroi[]> {
    return of(this.herois);
  }

  getHeroi(id: number): Observable<Heroi> {
    const heroi = this.herois.find(h => h.id === id);
    if (heroi) {
      return of(heroi);
    }
    return throwError(() => new Error('Herói não encontrado'));
  }

  adicionarHeroi(heroi: Heroi): Observable<Heroi> {
    const novoId = Math.max(...this.herois.map(h => h.id), 0) + 1;
    const novoHeroi = { ...heroi, id: novoId };
    this.herois.push(novoHeroi);
    return of(novoHeroi);
  }

  atualizarHeroi(heroi: Heroi): Observable<Heroi> {
    const index = this.herois.findIndex(h => h.id === heroi.id);
    if (index >= 0) {
      this.herois[index] = heroi;
      return of(heroi);
    }
    return throwError(() => new Error('Herói não encontrado'));
  }

  excluirHeroi(id: number): Observable<boolean> {
    const index = this.herois.findIndex(h => h.id === id);
    if (index >= 0) {
      this.herois.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}