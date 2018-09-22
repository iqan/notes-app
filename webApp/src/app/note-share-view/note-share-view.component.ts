import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotesService } from '../services/notes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from '../note';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-note-share-view',
  templateUrl: './note-share-view.component.html',
  styleUrls: ['./note-share-view.component.css']
})
export class NoteShareViewComponent implements OnInit {
  note: Note;
  errMessage: string;
  accessType: string;
  acTypes: Array<string> = [ 'viewer', 'editor' ];
  multiple: boolean;
  userNames: Array<string>;
  userNameControl = new FormControl();

  constructor(
    private dialogRef: MatDialogRef<NoteShareViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteService: NotesService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    const data = this.data.noteId;
    if (data === 'multiple') {
      this.multiple = true;
    } else {
      this.multiple = false;
      this.note = this.noteService.getNoteById(data);
    }
    this.authService.getUserNames().subscribe(
      usernames => this.userNames = usernames,
      error => this.handleErrorResponse(error)
    );
  }

  onSave() {
    this.noteService.shareNotes(this.userNameControl.value, this.accessType, [ this.note ]).subscribe(
      data => this.dialogRef.close(),
      error => this.handleErrorResponse(error)
    );
  }

  onSaveMultiple() {
    this.noteService.shareNotes(this.userNameControl.value, this.accessType).subscribe(
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
