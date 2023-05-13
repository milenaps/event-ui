import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IEvento } from "./evento";
import { EventoService } from "./evento.service";

@Component({
  templateUrl: './evento-lista.component.html'
})
export class EventoListaComponent implements OnInit, OnDestroy {
  pageTitle = 'Eventos';
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredEventos = this.performFilter(value);
  }

  filteredEventos: IEvento[] = [];
  eventos: IEvento[] = [];

  constructor(private service: EventoService) {}

  performFilter(filterBy: string): IEvento[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter((evento: IEvento) =>
      evento.nome.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.sub = this.service.getEventos().subscribe({
      next: eventos => {
        this.eventos = eventos;
        this.filteredEventos = this.eventos;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
