import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReminderService } from '../services/reminder.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-snooze-view',
  templateUrl: './snooze-view.component.html',
  styleUrls: ['./snooze-view.component.css']
})
export class SnoozeViewComponent {
  errMessage: string;
  min: number;
  minList: Array<number>;

  constructor(
    private dialogRef: MatDialogRef<SnoozeViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private reminderService: ReminderService) {
    this.minList = [2, 5, 10, 15];
  }

  onSave() {
    this.reminderService.snoozeReminder(this.data.notificationId, this.min).subscribe(
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
