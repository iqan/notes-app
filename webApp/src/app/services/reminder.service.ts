import { Injectable } from '@angular/core';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  baseUrl = environment.apiGatewayUrl + '/api/v1/notifications/reminders';
  reminders: Array<any>;
  remindersSubject: BehaviorSubject<Array<any>>;

  constructor(private httpClient: HttpClient,
    private authenticationService: AuthenticationService) {
      this.reminders = [];
      this.remindersSubject = new BehaviorSubject(this.reminders);
    }


  fetchRemindersFromServer(): void {
    const headers = this.getAuthorizationHeader();
    this.httpClient.get<Array<any>>(`${this.baseUrl}`, { headers })
      .subscribe(data => {
          this.reminders = data;
          this.remindersSubject.next(this.reminders);
        },
        errro => { }
      );
  }

  getReminderSubject(): BehaviorSubject<Array<any>> {
    return this.remindersSubject;
  }

  remind(remindAt: Date, note: Note): Observable<string> {
    const headers = this.getAuthorizationHeader();
    const reminder = {
      remindAt: remindAt,
      note: note,
      userName: this.authenticationService.getUserName()
    };
    return this.httpClient.post<any>(`${this.baseUrl}`, reminder, { headers })
      .pipe(tap(
        data => {
          this.reminders.push(data);
          this.remindersSubject.next(this.reminders);
        },
        error => { }
      ));
  }

  private getAuthorizationHeader() {
    const token = this.authenticationService.getBearerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
}
