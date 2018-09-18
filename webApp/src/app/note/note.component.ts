import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input()
  note: Note;
  showActions: boolean;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private routerService: RouterService, private notesService: NotesService,
              private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  openEditView() {
    this.routerService.routeToEditNoteView(this.note.id);
  }

  deleteNote(noteId) {
    this.notesService.deleteNoteById(noteId);
  }

  markAsFavourite(noteId) {
    this.notesService.markNoteAsFavourite(noteId);
  }

  addToGroup(noteId) {
    this.routerService.routeToAddToGroupView(this.note.id);
  }

  shareNote(noteId) {
    this.routerService.routeToShareNoteView(this.note.id);
  }

  remind(noteId) {
    this.routerService.routeToRemindNoteView(this.note.id);
  }
}
