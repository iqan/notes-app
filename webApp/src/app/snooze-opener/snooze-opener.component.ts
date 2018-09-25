import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RouterService } from '../services/router.service';
import { SnoozeViewComponent } from '../snooze-view/snooze-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-snooze-opener',
  templateUrl: './snooze-opener.component.html',
  styleUrls: ['./snooze-opener.component.css']
})
export class SnoozeOpenerComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService) {
      const notificationId = this.activatedRoute.snapshot.paramMap.get('notificationId');
      this.dialog.open(SnoozeViewComponent, {
        data: {
          notificationId : notificationId
        }
      })
      .afterClosed().subscribe(result => {
        this.routerService.routeBack();
      });
  }

  ngOnInit() {
  }

}
