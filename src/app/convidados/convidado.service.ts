import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";
import { EnvironmentService } from './../shared/environment.service';

import { IConvidado } from "./convidado";

@Injectable({
  providedIn: 'root'
})
export class ConvidadoService {
  private url: string;

  constructor(private env: EnvironmentService, private http: HttpClient) {
    this.url = env.baseUrl + "convidados/buscar/todos";
  }

  getConvidados(): Observable<IConvidado[]> {
    return this.http.get<IConvidado[]>(this.url)
      .pipe(
        tap(data => console.log('Convidados carregados por evento: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getConvidado(id: number): Observable<IConvidado | undefined> {
    return this.getConvidados()
      .pipe(
        map((convidados: IConvidado[]) => convidados.find(p => p.id === id))
      );
  }

  editarConvidado(convidado: IConvidado): Observable<IConvidado | undefined> {
    let action = this.http.post<IConvidado>(this.env.baseUrl + "convidados/cadastrar", convidado);
    if (convidado.id)
      action = this.http.put<IConvidado>(this.env.baseUrl + "convidados/atualizar", convidado);

    return action
      .pipe(
        tap(data => console.log("Usuário " + (convidado.id ? "atualizado" : "criado") + " com sucesso", JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deletarConvidado(id: string): Observable<IConvidado | undefined> {
    return this.http.delete<IConvidado>(this.env.baseUrl + "convidados/excluir/" + id)
      .pipe(
        tap(data => console.log("Convidado removido com sucesso", JSON.stringify(data))),
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
