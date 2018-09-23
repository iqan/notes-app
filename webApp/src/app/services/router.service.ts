import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {
  constructor(private router: Router, private location: Location) { }

  routeToDashboard() {
    this.router.navigate([ 'dashboard' ]);
  }

  routeToLogin() {
    this.router.navigate([ 'login' ]);
  }

  routeToLogout() {
    this.router.navigate([ 'logout' ]);
  }

  routeToRegister() {
    this.router.navigate([ 'register' ]);
  }

  routeToEditNoteView(noteId) {
    this.router.navigate([
      'dashboard',
      {
        outlets :
        {
          noteEditOutlet : [ 'note', noteId, 'edit' ]
        }
      }
    ]);
  }

  routeToAddToGroupView(noteId) {
    this.router.navigate([
      'dashboard',
      {
        outlets :
        {
          noteGroupOutlet : [ 'note', noteId, 'group' ]
        }
      }
    ]);
  }

  routeToShareNoteView(noteId) {
    this.router.navigate([
      'dashboard',
      {
        outlets :
        {
          noteShareOutlet : [ 'note', noteId, 'share' ]
        }
      }
    ]);
  }

  routeToRemindNoteView(noteId) {
    this.router.navigate([
      'dashboard',
      {
        outlets :
        {
          noteRemindOutlet : [ 'note', noteId, 'remind' ]
        }
      }
    ]);
  }

  routeToReminderListView() {
    this.router.navigate([
      'dashboard',
      {
        outlets :
        {
          noteReminderListOutlet : [ 'note', 'reminders' ]
        }
      }
    ]);
  }

  routeToSnoozeView(notificationId) {
    this.router.navigate([
      'dashboard',
      {
        outlets :
        {
          noteReminderSnoozeListOutlet : [ 'note', 'reminders', notificationId, 'snooze' ]
        }
      }
    ]);
  }

  routeBack() {
    this.location.back();
  }

  routeToNoteView() {
    this.router.navigate([ 'dashboard/view/noteview' ]);
  }

  routeToListView() {
    this.router.navigate([ 'dashboard/view/listview' ]);
  }
}
