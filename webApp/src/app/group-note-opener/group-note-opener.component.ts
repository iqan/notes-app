import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { GroupNoteViewComponent } from '../group-note-view/group-note-view.component';

@Component({
  selector: 'app-group-note-opener',
  templateUrl: './group-note-opener.component.html',
  styleUrls: ['./group-note-opener.component.css']
})

export class GroupNoteOpenerComponent {
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService) {
      const noteId = this.activatedRoute.snapshot.paramMap.get('noteId');
      this.dialog.open(GroupNoteViewComponent, {
        data: {
          noteId : noteId
        }
      })
      .afterClosed().subscribe(result => {
        this.routerService.routeBack();
      });
  }
}
