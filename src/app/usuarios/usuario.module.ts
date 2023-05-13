import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioListaComponent } from './usuario-lista.component';
import { UsuarioDetalheComponent } from './usuario-detalhe.component';
import { UsuarioDetalheGuard } from './usuario-detalhe.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UsuarioListaComponent,
    UsuarioDetalheComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'usuarios', component: UsuarioListaComponent },
      {
        path: 'usuarios/:id',
        canActivate: [UsuarioDetalheGuard],
        component: UsuarioDetalheComponent
      }
    ]),
    SharedModule
  ]
})
export class UsuarioModule { }
