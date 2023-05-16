import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUsuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Component({
  templateUrl: './usuario-edicao.component.html'
})
export class UsuarioEdicaoComponent implements OnInit {
  errorMessage = '';
  usuario: IUsuario | undefined;
  checkoutForm: FormGroup

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private service: UsuarioService) {
    this.checkoutForm = this.formBuilder.group({
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      senha: ''
    })
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getUsuario(id);
    }
  }

  getUsuario(id: number): void {
    this.service.getUsuario(id).subscribe({
      next: usuario => {
        this.usuario = usuario;

        this.checkoutForm = this.formBuilder.group({
          id,
          nome: this.usuario?.nome,
          cpf: this.usuario?.cpf,
          email: this.usuario?.email,
          telefone: this.usuario?.telefone,
          senha: this.usuario?.senha
        });
      },
      error: err => this.errorMessage = err
    });
  }

  onSubmit(): void {
    var data = {
      "id": this.checkoutForm.get("id")?.value,
      "nome": this.checkoutForm.get("nome")?.value,
      "cpf": this.checkoutForm.get("cpf")?.value,
      "email": this.checkoutForm.get("email")?.value,
      "telefone": this.checkoutForm.get("telefone")?.value,
      "senha": this.checkoutForm.get("senha")?.value
    }
    this.service.editarUsuario(data).subscribe({
      next: usuario => this.usuario = usuario,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/usuarios']);
  }
}
