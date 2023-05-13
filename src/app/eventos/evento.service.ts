import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";

import { IEvento } from "./evento";

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private url = 'api/eventos.json';

  constructor(private http: HttpClient) { }

  getEventos(): Observable<IEvento[]> {
    return this.http.get<IEvento[]>(this.url)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getEvento(id: number): Observable<IEvento | undefined> {
    return this.getEventos()
      .pipe(
        map((eventos: IEvento[]) => eventos.find(p => p.id === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Falha na execução: ${err.error.message}`;
    } else {
      errorMessage = `Retorno de erro do servidor: ${err.status}, mensagem de erro: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
