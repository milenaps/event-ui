import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConvidadoListaComponent } from './convidado-lista.component';
import { ConvidadoEdicaoComponent } from './convidado-edicao.component';
import { ConvidadoDetalheComponent } from './convidado-detalhe.component';
import { ConvidadoDetalheGuard } from './convidado-detalhe.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ConvidadoListaComponent,
    ConvidadoDetalheComponent,
    ConvidadoEdicaoComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'convidados/:eventoId',
        component: ConvidadoListaComponent
      },
      {
        path: 'convidados/:eventoId/:id',
        canActivate: [ConvidadoDetalheGuard],
        component: ConvidadoDetalheComponent
      },
      {
        path: 'editar-convidado/:eventoId',
        component: ConvidadoEdicaoComponent
      },
      {
        path: 'editar-convidado/:eventoId/:id',
        component: ConvidadoEdicaoComponent
      }
    ]),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ConvidadoModule { }
