import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { HttpErrorResponse } from '@angular/common/http';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  errMessage: string;
  note: Note;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.note = new Note();
  }

  addNote() {
    this.errMessage = '';
    if (this.validateNote(this.note)) {
      this.notesService.addNote(this.note).subscribe(
        data => this.note = new Note(),
        error => this.handleErrorResponse(error)
      );
    }
  }

  validateNote(note): boolean {
    if (note.title === '' ||
        !note.title.trim() ||
        note.text === '' ||
        !note.text.trim()) {
      this.errMessage = 'Title and Text both are required fields';
      return false;
    }
    return true;
  }

  handleErrorResponse(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.errMessage = error.message;
    } else {
      this.errMessage = 'An error occurred:' + error.error.message;
    }
  }
}
