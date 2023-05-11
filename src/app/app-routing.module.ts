import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { VisualizarUsuarioComponent } from './visualizar-usuario/visualizar-usuario.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full'},
  { path: 'Home', component: HomeComponent },
  { path: 'VisualizarUsuario/:usuarioId', component: VisualizarUsuarioComponent },
  { path: 'CriarUsuario', component: CriarUsuarioComponent },
  { path: 'EditarUsuario/:usuarioId', component: EditarUsuarioComponent }
];
 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }