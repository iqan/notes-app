import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-group-note-view',
  templateUrl: './group-note-view.component.html',
  styleUrls: ['./group-note-view.component.css']
})
export class GroupNoteViewComponent implements OnInit {
  note: Note;
  errMessage: string;

  constructor(
    private dialogRef: MatDialogRef<GroupNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteService: NotesService) { }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.noteId);
  }

  onSave() {
    this.noteService.editNote(this.note).subscribe(
      data => this.dialogRef.close(),
      error => this.handleErrorResponse(error)
    );
  }

  handleErrorResponse(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.errMessage = error.message;
    } else {
      this.errMessage = 'An error occurred:' + error.error.message;
    }
  }
}
