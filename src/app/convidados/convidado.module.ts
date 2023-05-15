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
    ConvidadoEdicaoComponent,
    ConvidadoDetalheComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'convidados',
        component: ConvidadoListaComponent
      },
      {
        path: 'convidados/:id',
        canActivate: [ConvidadoDetalheGuard],
        component: ConvidadoDetalheComponent
      },
      {
        path: 'editar-convidado',
        component: ConvidadoEdicaoComponent
      },
      {
        path: 'editar-convidado/:id',
        component: ConvidadoEdicaoComponent
      }
    ]),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ConvidadoModule { }
