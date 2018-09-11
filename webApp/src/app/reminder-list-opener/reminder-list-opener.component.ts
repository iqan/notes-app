import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RouterService } from '../services/router.service';
import { ReminderListViewComponent } from '../reminder-list-view/reminder-list-view.component';

@Component({
  selector: 'app-reminder-list-opener',
  templateUrl: './reminder-list-opener.component.html',
  styleUrls: ['./reminder-list-opener.component.css']
})
export class ReminderListOpenerComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private routerService: RouterService) {
      this.dialog.open(ReminderListViewComponent)
      .afterClosed().subscribe(result => {
        this.routerService.routeBack();
      });
  }

  ngOnInit() {
  }

}
