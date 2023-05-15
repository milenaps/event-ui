import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template: ` 
    <div class='header'>
      <div class='logo'>
        <a routerLinkActive='active' routerLink='/home'>
          <img src='./assets/images/logo.png' alt='Logotipo iChurras' style='max-height:8em;' />
        </a>
      </div>
      <div class='title'>
        <h1>{{pageTitle}}</h1>
      </div>
      <div class='login'>
        <div class='login-usuario'>
          <p>
            <a class='nav-link' routerLinkActive='active' [routerLink]='["/usuarios", userId]'>
              {{userName}}
            </a>
          </p>
        </div>
        <div class='login-acao'>
          <a routerLinkActive='active' routerLink='/home'>
            <i class='fa fa-sign-out fa-2x' aria-hidden='true'></i>
          </a>
        </div>
      </div>
    </div>
    <div class='menu'>
      <ul class='nav nav-pills'>
        <li><a class='nav-link' routerLinkActive='active' routerLink='/usuarios'>Usuários</a></li>
        <li><a class='nav-link' routerLinkActive='active' routerLink='/eventos'>Eventos</a></li>
        <li><a class='nav-link' routerLinkActive='active' routerLink='/convidados'>Lista de Convidados</a></li>
      </ul>
    </div>
    <div class='content'>
      <router-outlet></router-outlet>
    </div>
    `
})
export class AppComponent {
  pageTitle = 'Sistema iChurras';
  userName = "Fernando"
  userId = 1
}
