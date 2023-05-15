import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventoService } from './evento.service';
import { IEvento } from './evento';
import { IConvidado } from '../convidados/convidado';

@Component({
  templateUrl: './convidado-edicao.component.html'
})
export class ConvidadoEdicaoComponent implements OnInit {
  errorMessage = '';
  evento: IEvento | undefined;
  convidado: IConvidado | undefined;
  checkoutForm: FormGroup;
  eventoId = 0;
  convidadoId = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private service: EventoService) {
    this.checkoutForm = this.formBuilder.group({
    });
  }

  ngOnInit(): void {
    const eventoId = Number(this.route.snapshot.paramMap.get('eventoId'));
    const convidadoId = Number(this.route.snapshot.paramMap.get('id'));
    if (eventoId) {
      this.getEvento(eventoId, convidadoId);
    }
  }

  getEvento(eventoId: number, convidadoId: number): void {
    this.eventoId = eventoId;
    this.convidadoId = convidadoId;

    this.service.getEvento(eventoId).subscribe({
      next: evento => {
        this.evento = evento;

        this.checkoutForm = this.formBuilder.group({
          id: convidadoId,
          nome: this.convidado?.nome,
          documento: this.convidado?.documento,
          telefone: this.convidado?.telefone,
          valorDevido: this.convidado?.valorDevido,
          pago: this.convidado?.pago,
          eventoId: eventoId
        });
      },
      error: err => this.errorMessage = err
    });
  }

  onSubmit(): void {
    var data = {
      "id": this.convidadoId,
      "nome": this.checkoutForm.get("nome")?.value,
      "documento": this.checkoutForm.get("documento")?.value,
      "telefone": this.checkoutForm.get("telefone")?.value,
      "valorDevido": this.checkoutForm.get("valorDevido")?.value,
      "pago": this.checkoutForm.get("pago")?.value,
      "eventoId": this.eventoId
    }

    if (this.evento) {
      this.evento.convidados?.push(data);

      this.service.editarEvento(this.evento).subscribe({
        next: evento => this.evento = evento,
        error: err => this.errorMessage = err
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/eventos/' + this.eventoId]);
  }
}
