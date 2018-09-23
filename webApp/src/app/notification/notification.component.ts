import { Component, OnInit, Inject } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public snackBar: MatSnackBar;

  constructor(private socketService: SocketService, private msnackBar: MatSnackBar) {
    this.snackBar = msnackBar;
  }

  ngOnInit() {
    setTimeout(() => {
      this.socketService.getNotificationSubject().subscribe(
        notification => this.snackBar.open(notification, 'Done', {
          duration: 2000
        }),
        err => { }
      );
    });
  }
}
