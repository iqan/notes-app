import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../login';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  baseUrl = 'http://localhost:3000/api/v1/users/';
  authTokenName = 'bearerToken';

  constructor(private httpClient: HttpClient) { }

  register(data: Login) {
    return this.httpClient.post(`${this.baseUrl}register`, data);
  }

  authenticateUser(data: Login) {
    return this.httpClient.post(`${this.baseUrl}login`, data);
  }

  setBearerToken(token) {
    localStorage.setItem(this.authTokenName, token);
  }

  getBearerToken() {
    return localStorage.getItem(this.authTokenName);
  }

  isUserAuthenticated(token): Promise<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(`${this.baseUrl}isAuthenticated`, { }, { headers })
      .map(res => res['isAuthenticated'])
      .toPromise();
  }

  logout() {
    localStorage.removeItem(this.authTokenName);
  }
}
