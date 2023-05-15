import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EventoListaComponent } from './evento-lista.component';
import { EventoEdicaoComponent } from './evento-edicao.component';
import { EventoDetalheComponent } from './evento-detalhe.component';
import { EventoDetalheGuard } from './evento-detalhe.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EventoListaComponent,
    EventoDetalheComponent,
    EventoEdicaoComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'eventos', component: EventoListaComponent },
      {
        path: 'eventos/:id',
        canActivate: [EventoDetalheGuard],
        component: EventoDetalheComponent
      },
      {
        path: 'editar-evento',
        component: EventoEdicaoComponent
      },
      {
        path: 'editar-evento/:id',
        component: EventoEdicaoComponent
      }
    ]),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EventoModule { }
