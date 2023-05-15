import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Component({
  templateUrl: './usuario-detalhe.component.html'
})
export class UsuarioDetalheComponent implements OnInit {
  pageTitle = 'Detalhes do Usuário';
  errorMessage = '';
  usuario: IUsuario | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: UsuarioService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getUsuario(id);
    }
  }

  getUsuario(id: number): void {
    this.service.getUsuario(id).subscribe({
      next: usuario => this.usuario = usuario,
      error: err => this.errorMessage = err
    });
  }

  deletarUsuario(id: string): void {
    this.service.deletarUsuario(id).subscribe({
      next: usuario => this.usuario = usuario,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }
}
