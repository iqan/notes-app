import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SocketService {
  socket: any = io(environment.apiGatewayUrl);
  notificationSubject: BehaviorSubject<string>;

  constructor() {
    this.socket = io(environment.apiGatewayUrl);
    this.notificationSubject = new BehaviorSubject('');
  }

  register(userName: string): void {
    this.socket.on('connect', () => {
      console.log('Connected to the server');
      this.notificationSubject.next('Connected to the server');
      this.socket.emit('register', userName);
    });

    this.socket.on('share-note', (shareInfo) => {
      console.log('A note has been shared with you:');
      this.notificationSubject.next('A note has been shared with you: ' + JSON.stringify(shareInfo));
      console.log(shareInfo);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnect for the server');
      this.notificationSubject.next('disconnected from the server');
    });
  }

  getNotificationSubject(): BehaviorSubject<string> {
    return this.notificationSubject;
  }
}
