import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
import { IEvento } from './../eventos/evento';
import { EventoService } from './../eventos/evento.service';
import { IConvidado } from "./convidado";
import { ConvidadoService } from "./convidado.service";

@Component({
  templateUrl: './convidado-lista.component.html'
})
export class ConvidadoListaComponent implements OnInit, OnDestroy {
  pageTitle = 'Convidados';
  evento: IEvento | undefined;
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

  constructor(private route: ActivatedRoute,
              private eventoService: EventoService,
              private service: ConvidadoService) {}

  performFilter(filterBy: string): IConvidado[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.convidados.filter((convidado: IConvidado) =>
      convidado.nome.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    if (eventId) {
      this.getEvento(eventId);
    }
    this.sub = this.service.getConvidados().subscribe({
      next: convidados => {
        this.convidados = convidados;
        this.filteredConvidados = this.convidados;
      },
      error: err => this.errorMessage = err
    });
  }

  getEvento(id: number): void {
    this.eventoService.getEvento(id).subscribe({
      next: evento => this.evento = evento,
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
