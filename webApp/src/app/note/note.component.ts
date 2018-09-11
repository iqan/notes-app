import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input()
  note: Note;
  showActions: boolean;

  constructor(private routerService: RouterService, private notesService: NotesService) { }

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
