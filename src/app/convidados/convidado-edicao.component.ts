import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IConvidado } from './convidado';
import { ConvidadoService } from './convidado.service';

@Component({
  templateUrl: './convidado-edicao.component.html'
})
export class ConvidadoEdicaoComponent implements OnInit {
  errorMessage = '';
  convidado: IConvidado | undefined;
  checkoutForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private service: ConvidadoService) {
    this.checkoutForm = this.formBuilder.group({
      nome: '',
      documento: '',
      telefone: '',
      valorDevido: '',
      pago: false
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getConvidado(id);
    }
  }

  getConvidado(id: number): void {
    this.service.getConvidado(id).subscribe({
      next: convidado => {
        this.convidado = convidado;

        this.checkoutForm = this.formBuilder.group({
          id,
          nome: this.convidado?.nome,
          documento: this.convidado?.documento,
          telefone: this.convidado?.telefone,
          valorDevido: this.convidado?.valorDevido,
          pago: this.convidado?.pago,
          eventoId: this.convidado?.eventoId
        });
      },
      error: err => this.errorMessage = err
    });
  }

  onSubmit(): void {
    var data = {
      "id": this.checkoutForm.get("id")?.value,
      "nome": this.checkoutForm.get("nome")?.value,
      "documento": this.checkoutForm.get("documento")?.value,
      "telefone": this.checkoutForm.get("telefone")?.value,
      "valorDevido": this.checkoutForm.get("valorDevido")?.value,
      "pago": this.checkoutForm.get("pago")?.value,
      "eventoId": 1
    }
    this.service.editarConvidado(data).subscribe({
      next: convidado => {
        this.convidado = convidado;

        this.router.navigate(['/editar-convidado/' + convidado?.id]);
      },
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/eventos/1']);
  }
}
