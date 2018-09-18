import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { NotesService } from './notes.service';

@Injectable()
export class SocketService {
  socket: any = io(environment.apiGatewayUrl);
  notificationSubject: BehaviorSubject<string>;
  userName: string;

  constructor(private authService: AuthenticationService, private notesService: NotesService) {
    this.socket = io(environment.apiGatewayUrl);
    this.notificationSubject = new BehaviorSubject('');
    this.userName = this.authService.getUserName();
    this.socket.emit('register', this.userName);

    this.socket.on('connect', () => {
      this.notificationSubject.next('Connected to the server');
    });

    this.socket.on('share-note', (shareInfo) => {
      const title = shareInfo.note.title;
      this.notificationSubject.next('A note has been shared with you: ' + title);
      this.notesService.addSharedNote(shareInfo.note);
    });

    this.socket.on('reminder', (shareInfo) => {
      const title = shareInfo.note.title;
      this.notificationSubject.next('Reminder: ' + title);
    });

    this.socket.on('disconnect', () => {
      this.notificationSubject.next('disconnected from the server');
    });
  }

  getNotificationSubject(): BehaviorSubject<string> {
    return this.notificationSubject;
  }

  disconnect(): void {
    this.socket.emit('deregister', this.userName);
  }
}
