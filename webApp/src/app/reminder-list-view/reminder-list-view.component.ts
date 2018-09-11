import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-reminder-list-view',
  templateUrl: './reminder-list-view.component.html',
  styleUrls: ['./reminder-list-view.component.css']
})
export class ReminderListViewComponent implements OnInit {
  reminders = [];
  errMessage: string;

  constructor(
    private dialogRef: MatDialogRef<ReminderListViewComponent>,
    private reminderService: ReminderService) { }

  ngOnInit() {
    this.reminderService.fetchRemindersFromServer();
    this.reminderService.getReminderSubject()
    .subscribe(
      data => this.reminders = data,
      err => { }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
