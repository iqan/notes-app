import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RouterService } from '../services/router.service';
import { NoteShareViewComponent } from '../note-share-view/note-share-view.component';

@Component({
  selector: 'app-note-share-opener',
  templateUrl: './note-share-opener.component.html',
  styleUrls: ['./note-share-opener.component.css']
})
export class NoteShareOpenerComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService) {
      const noteId = this.activatedRoute.snapshot.paramMap.get('noteId');
      this.dialog.open(NoteShareViewComponent, {
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
