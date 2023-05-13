import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvento } from './evento';
import { EventoService } from './evento.service';

@Component({
  templateUrl: './evento-detalhe.component.html'
})
export class EventoDetalheComponent implements OnInit {
  pageTitle = 'Detalhes do Evento';
  errorMessage = '';
  evento: IEvento | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: EventoService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getEvento(id);
    }
  }

  getEvento(id: number): void {
    this.service.getEvento(id).subscribe({
      next: evento => this.evento = evento,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/eventos']);
  }
}
