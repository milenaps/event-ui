import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventoModule } from './eventos/evento.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { ConvidadoModule } from './convidados/convidado.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    EventoModule,
    UsuarioModule,
    ConvidadoModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
