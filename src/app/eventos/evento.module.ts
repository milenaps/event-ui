import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventoListaComponent } from './evento-lista.component';
import { EventoDetalheComponent } from './evento-detalhe.component';
import { EventoDetalheGuard } from './evento-detalhe.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EventoListaComponent,
    EventoDetalheComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'eventos', component: EventoListaComponent },
      {
        path: 'eventos/:id',
        canActivate: [EventoDetalheGuard],
        component: EventoDetalheComponent
      }
    ]),
    SharedModule
  ]
})
export class EventoModule { }
