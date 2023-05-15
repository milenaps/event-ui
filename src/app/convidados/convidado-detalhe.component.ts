import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IConvidado } from './convidado';
import { ConvidadoService } from './convidado.service';

@Component({
  templateUrl: './convidado-detalhe.component.html'
})
export class ConvidadoDetalheComponent implements OnInit {
  pageTitle = 'Detalhes do Convidado';
  errorMessage = '';
  convidado: IConvidado | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: ConvidadoService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getConvidado(id);
    }
  }

  getConvidado(id: number): void {
    this.service.getConvidado(id).subscribe({
      next: convidado => this.convidado = convidado,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/convidados']);
  }
}
