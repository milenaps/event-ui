import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IConvidado } from "./convidado";
import { ConvidadoService } from "./convidado.service";

@Component({
  templateUrl: './convidado-lista.component.html'
})
export class ConvidadoListaComponent implements OnInit, OnDestroy {
  pageTitle = 'Convidados';
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredConvidados = this.performFilter(value);
  }

  filteredConvidados: IConvidado[] = [];
  convidados: IConvidado[] = [];

  constructor(private service: ConvidadoService) {}

  performFilter(filterBy: string): IConvidado[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.convidados.filter((convidado: IConvidado) =>
      convidado.nome.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.sub = this.service.getConvidados().subscribe({
      next: convidados => {
        this.convidados = convidados;
        this.filteredConvidados = this.convidados;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
