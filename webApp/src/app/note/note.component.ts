import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input()
  note: Note;
  showActions: boolean;
  mobileQuery: MediaQueryList;
  isSelected = false;
  private _mobileQueryListener: () => void;

  constructor(private routerService: RouterService, private notesService: NotesService,
              private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.notesService.getSelectedNotesSubject().subscribe(n => {
      this.isSelected = n.indexOf(this.note.id) > -1;
    });
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
    this.routerService.routeToAddToGroupView(noteId);
  }

  shareNote(noteId) {
    this.routerService.routeToShareNoteView(noteId);
  }

  remind(noteId) {
    this.routerService.routeToRemindNoteView(noteId);
  }

  markNote(noteId) {
    this.notesService.addNoteAsSelected(noteId);
  }
}
