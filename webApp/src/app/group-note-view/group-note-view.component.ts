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
  groupName: string;
  multiple: boolean;

  constructor(
    private dialogRef: MatDialogRef<GroupNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteService: NotesService) { }

  ngOnInit() {
    const data = this.data.noteId;
    if (data === 'multiple') {
      this.multiple = true;
    } else {
      this.multiple = false;
      this.note = this.noteService.getNoteById(data);
    }
  }

  onSave() {
    this.noteService.editNote(this.note).subscribe(
      data => this.dialogRef.close(),
      error => this.handleErrorResponse(error)
    );
  }

  onSaveMultiple() {
    this.noteService.addSelectedToGroup(this.groupName);
    this.dialogRef.close();
  }

  handleErrorResponse(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.errMessage = error.message;
    } else {
      this.errMessage = 'An error occurred:' + error.error.message;
    }
  }
}
