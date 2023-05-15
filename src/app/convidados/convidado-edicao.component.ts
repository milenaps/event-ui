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
  checkoutForm: FormGroup

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private service: ConvidadoService) {
    this.checkoutForm = this.formBuilder.group({
    })
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getConvidado(id);
    }
    this.checkoutForm = this.formBuilder.group({
      id,
      nome: this.convidado?.nome,
      data: this.convidado?.telefone,
      horario: this.convidado?.pago
    });
  }

  getConvidado(id: number): void {
    this.service.getConvidado(id).subscribe({
      next: convidado => this.convidado = convidado,
      error: err => this.errorMessage = err
    });
  }

  onSubmit(): void {
    var data = {
      "id": this.checkoutForm.get("id")?.value,
      "nome": this.checkoutForm.get("nome")?.value,
      "telefone": this.checkoutForm.get("telefone")?.value,
      "pago": this.checkoutForm.get("pago")?.value,
      "ConvidadoId": 1
    }
    this.service.editarConvidado(data).subscribe({
      next: convidado => this.convidado = convidado,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/Convidados']);
  }
}
