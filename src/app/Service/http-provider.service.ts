import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8080/";

var httpLink = {
  getAllUsers: apiUrl + "/events",
  getUserById: apiUrl + "/events/getEventById",
  saveUser: apiUrl + "/usuarios/getUsuarioById",
  deleteUserById: apiUrl + "/usuarios/getUsuarioById"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllUsers(): Observable<any> {
    return this.webApiService.get(httpLink.getAllUsers);
  }
  public getUserDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getUserById + '?UserId=' + model);
  }
  public saveUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveUser, model);
  }
  public deleteUserById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteUserById + '?UserId=' + model, "");
  }
}