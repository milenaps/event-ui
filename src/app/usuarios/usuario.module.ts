import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioListaComponent } from './usuario-lista.component';
import { UsuarioEdicaoComponent } from './usuario-edicao.component';
import { UsuarioDetalheComponent } from './usuario-detalhe.component';
import { UsuarioDetalheGuard } from './usuario-detalhe.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UsuarioListaComponent,
    UsuarioDetalheComponent,
    UsuarioEdicaoComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'usuarios', component: UsuarioListaComponent },
      {
        path: 'usuarios/:id',
        canActivate: [UsuarioDetalheGuard],
        component: UsuarioDetalheComponent
      },
      {
        path: 'editar-usuario',
        component: UsuarioEdicaoComponent
      },
      {
        path: 'editar-usuario/:id',
        component: UsuarioEdicaoComponent
      }
    ]),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
