import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";
import { EnvironmentService } from './../shared/environment.service';

import { IUsuario } from "./usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private env: EnvironmentService, private http: HttpClient) {}

  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.env.baseUrl + "usuario/todos")
      .pipe(
        tap(() => console.log("Carregou usuários")),
        catchError(this.handleError)
      );
  }

  getUsuario(id: number): Observable<IUsuario | undefined> {
    return this.getUsuarios()
      .pipe(
        map((usuarios: IUsuario[]) => usuarios.find(p => p.id === id))
      );
  }

  editarUsuario(usuario: IUsuario): Observable<IUsuario | undefined> {
    let action = this.http.post<IUsuario>(this.env.baseUrl + "usuario/cadastrar", usuario);
    if (usuario.id)
      action = this.http.put<IUsuario>(this.env.baseUrl + "usuario/atualizar", usuario);

    return action
      .pipe(
        tap(data => console.log("Usuário " + (usuario.id ? "atualizado" : "criado") + " com sucesso", JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deletarUsuario(id: string): Observable<IUsuario | undefined> {
    return this.http.delete<IUsuario>(this.env.baseUrl + "usuario/excluir/" + id)
      .pipe(
        tap(data => console.log("Usuário removido com sucesso", JSON.stringify(data))),
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
