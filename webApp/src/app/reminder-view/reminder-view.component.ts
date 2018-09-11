import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotesService } from '../services/notes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-reminder-view',
  templateUrl: './reminder-view.component.html',
  styleUrls: ['./reminder-view.component.css']
})
export class ReminderViewComponent implements OnInit {
  note: Note;
  errMessage: string;
  date = new FormControl(new Date());
  minDate = new Date();
  hour: number;
  min: number;
  hourList: Array<number> = new Array<number>();
  minList: Array<number> = new Array<number>();

  constructor(
    private dialogRef: MatDialogRef<ReminderViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteService: NotesService,
    private reminderService: ReminderService) { }

  ngOnInit() {
    for (let i = 0; i < 24; i++) {
      this.hourList.push(i);
    }
    for (let i = 0; i < 60; i++) {
      this.minList.push(i);
    }
    this.note = this.noteService.getNoteById(this.data.noteId);
  }

  onSave() {
    const d = this.date.value as Date;
    d.setMinutes(this.min);
    d.setHours(this.hour);
    this.reminderService.remind(d, this.note).subscribe(
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
