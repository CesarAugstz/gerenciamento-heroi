import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { Superpoder } from "../../models/heroi.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root',
})
export class SuperpoderesService extends BaseService {
  private endpoint = this.apiUrl + '/api/superpoderes';

  constructor(http: HttpClient) {
    super(http);
  }

  getSuperpoderes(): Observable<Superpoder[]> {
    return this.http
      .get<Superpoder[]>(`${this.endpoint}`)
      .pipe(catchError(this.tratarErro));
  }
}
