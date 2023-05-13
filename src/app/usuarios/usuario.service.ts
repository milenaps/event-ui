import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";

import { IUsuario } from "./usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'api/usuarios.json';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.url)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getUsuario(id: number): Observable<IUsuario | undefined> {
    return this.getUsuarios()
      .pipe(
        map((usuarios: IUsuario[]) => usuarios.find(p => p.id === id))
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
