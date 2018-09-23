import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { MatSnackBar } from '@angular/material';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public snackBar: MatSnackBar;

  constructor(
    private socketService: SocketService,
    private msnackBar: MatSnackBar,
    private routerService: RouterService) {
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
      this.socketService.getReminderSubject().subscribe(
        reminder => this.openSnackBar(reminder),
        err => { }
      );
    });
  }

  private openSnackBar(notification: string): void {
    if (notification.trim() !== '') {
      const snackBarRef = this.snackBar.open(notification, 'Snooze');
      snackBarRef.onAction().subscribe(
        () => this.routerService.routeToSnoozeView(this.socketService.getNotificationId())
      );
    }
  }
}
