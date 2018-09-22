import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../login';
import 'rxjs/add/operator/map';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  baseUrl = environment.apiGatewayUrl + 'api/v1/users/';
  authTokenName = 'bearerToken';
  isAuthenticated: boolean;
  isAuthenticatedSubject: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient) {
    this.isAuthenticatedSubject = new BehaviorSubject(this.isAuthenticated);
  }

  register(data: Login) {
    return this.httpClient.post(`${this.baseUrl}register`, data);
  }

  authenticateUser(data: Login) {
    return this.httpClient.post(`${this.baseUrl}login`, data);
  }

  setBearerToken(token) {
    localStorage.setItem(this.authTokenName, token);
  }

  setUserName(userName) {
    localStorage.setItem('userName', userName);
  }

  getBearerToken() {
    return localStorage.getItem(this.authTokenName);
  }

  getUserName() {
    return localStorage.getItem('userName');
  }

  isUserAuthenticated(token): Promise<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(`${this.baseUrl}isAuthenticated`, { }, { headers })
      .pipe(tap(
        data => {
          this.isAuthenticated = data['isAuthenticated'];
          this.isAuthenticatedSubject.next(this.isAuthenticated);
        },
        error => { }
      ))
      .map(res => res['isAuthenticated'])
      .toPromise();
  }

  getAuthenticatedSubject() {
    return this.isAuthenticatedSubject;
  }

  logout() {
    localStorage.removeItem(this.authTokenName);
    localStorage.removeItem('userName');
    this.isAuthenticatedSubject.next(false);
    this.isAuthenticated = false;
  }

  getUserNames(): Observable<Array<string>> {
    const token = this.getBearerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Array<string>>(`${this.baseUrl}getall`, { headers: headers })
      .map(data => data.filter(u => u !== this.getUserName()));
  }
}
