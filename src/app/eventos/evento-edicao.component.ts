import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEvento } from './evento';
import { EventoService } from './evento.service';

@Component({
  templateUrl: './evento-edicao.component.html'
})
export class EventoEdicaoComponent implements OnInit {
  errorMessage = '';
  evento: IEvento | undefined;
  checkoutForm: FormGroup

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private service: EventoService) {
    this.checkoutForm = this.formBuilder.group({
    })
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getEvento(id);
    }
    this.checkoutForm = this.formBuilder.group({
      id,
      nome: this.evento?.nome,
      endereco: this.evento?.endereco,
      data: this.evento?.dataEvento,
      horario: this.evento?.horarioEvento,
      valorTotal: this.evento?.valorTotalEvento
    });
  }

  getEvento(id: number): void {
    this.service.getEvento(id).subscribe({
      next: evento => this.evento = evento,
      error: err => this.errorMessage = err
    });
  }

  onSubmit(): void {
    var data = {
      "id": this.checkoutForm.get("id")?.value,
      "nome": this.checkoutForm.get("nome")?.value,
      "endereco": this.checkoutForm.get("endereco")?.value,
      "dataEvento": this.checkoutForm.get("data")?.value,
      "horarioEvento": this.checkoutForm.get("horario")?.value,
      "valorTotalEvento": this.checkoutForm.get("valorTotal")?.value,
      "usuarioId": 1
    }
    this.service.editarEvento(data).subscribe({
      next: evento => this.evento = evento,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }
}
