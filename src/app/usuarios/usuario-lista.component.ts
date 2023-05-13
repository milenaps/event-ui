import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IUsuario } from "./usuario";
import { UsuarioService } from "./usuario.service";

@Component({
  templateUrl: './usuario-lista.component.html'
})
export class UsuarioListaComponent implements OnInit, OnDestroy {
  pageTitle = 'Usuários';
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUsuarios = this.performFilter(value);
  }

  filteredUsuarios: IUsuario[] = [];
  usuarios: IUsuario[] = [];

  constructor(private service: UsuarioService) {}

  performFilter(filterBy: string): IUsuario[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.usuarios.filter((usuario: IUsuario) =>
      usuario.nome.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.sub = this.service.getUsuarios().subscribe({
      next: usuarios => {
        this.usuarios = usuarios;
        this.filteredUsuarios = this.usuarios;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
