import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";
import { EnvironmentService } from './../shared/environment.service';

import { IEvento } from "./evento";
import { IConvidado } from "../convidados/convidado";

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private url: string;

  constructor(private env: EnvironmentService, private http: HttpClient) {
    this.url = env.baseUrl + "evento/buscar/todos";
  }

  getEventos(): Observable<IEvento[]> {
    return this.http.get<IEvento[]>(this.url)
      .pipe(
        tap(data => console.log('Eventos carregados por usuário: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getEvento(id: number): Observable<IEvento | undefined> {
    return this.getEventos()
      .pipe(
        map((eventos: IEvento[]) => eventos.find(p => p.id === id))
      );
  }

  editarEvento(evento: IEvento): Observable<IEvento | undefined> {
    let action = this.http.post<IEvento>(this.env.baseUrl + "evento/cadastrar", evento);
    if (evento.id)
      action = this.http.put<IEvento>(this.env.baseUrl + "evento/atualizar", evento);

    return action
      .pipe(
        tap(data => console.log("Usuário " + (evento.id ? "atualizado" : "criado") + " com sucesso", JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deletarEvento(id: string): Observable<IEvento | undefined> {
    return this.http.delete<IEvento>(this.env.baseUrl + "evento/excluir/" + id)
      .pipe(
        tap(data => console.log("Evento removido com sucesso", JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getConvidados(): Observable<IConvidado[]> {
    return this.http.get<IConvidado[]>(this.url)
      .pipe(
        tap(data => console.log('Convidados carregados por evento: ', JSON.stringify(data))),
        catchError(this.handleError)
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
