import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotesService } from '../services/notes.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reminder-view',
  templateUrl: './reminder-view.component.html',
  styleUrls: ['./reminder-view.component.css']
})
export class ReminderViewComponent implements OnInit {
  note: Note;
  errMessage: string;

  constructor(
    private dialogRef: MatDialogRef<ReminderViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteService: NotesService) { }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.noteId);
  }

  onSave() {
    console.log('reminding for note');
  }

  handleErrorResponse(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.errMessage = error.message;
    } else {
      this.errMessage = 'An error occurred:' + error.error.message;
    }
  }

}
