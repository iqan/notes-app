import { Component, OnInit } from '@angular/core';
import { ReminderViewComponent } from '../reminder-view/reminder-view.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-reminder-opener',
  templateUrl: './reminder-opener.component.html',
  styleUrls: ['./reminder-opener.component.css']
})
export class ReminderOpenerComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService) {
      const noteId = this.activatedRoute.snapshot.paramMap.get('noteId');
      this.dialog.open(ReminderViewComponent, {
        data: {
          noteId : noteId
        }
      })
      .afterClosed().subscribe(result => {
        this.routerService.routeBack();
      });
  }

  ngOnInit() {
  }

}
