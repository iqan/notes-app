import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  groups = Array<string>();
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private notesService: NotesService,
              private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.notesService.fetchNotesFromServer();
    this.notesService.getNotes().subscribe(notes => {
      this.groups = notes.map(n => n.group)
        .filter((value, index, self) => self.indexOf(value) === index && value !== undefined);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  showAllNotes() {
    this.notesService.showAllNotes();
  }

  showNotesInGroup(group) {
    this.notesService.showNotesInGroup(group);
  }

  showFavourites() {
    this.notesService.showFavourites();
  }
}
