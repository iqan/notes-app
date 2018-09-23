import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// material imports
import {
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatSidenavModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatMenuModule,
  MatAutocompleteModule
} from '@angular/material';

// components inports
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { HeaderComponent } from './header/header.component';
import { ListViewComponent } from './list-view/list-view.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { GroupNoteOpenerComponent } from './group-note-opener/group-note-opener.component';
import { GroupNoteViewComponent } from './group-note-view/group-note-view.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NoteShareOpenerComponent } from './note-share-opener/note-share-opener.component';
import { NoteShareViewComponent } from './note-share-view/note-share-view.component';
import { NotificationComponent } from './notification/notification.component';
import { ReminderOpenerComponent } from './reminder-opener/reminder-opener.component';
import { ReminderViewComponent } from './reminder-view/reminder-view.component';
import { ReminderListOpenerComponent } from './reminder-list-opener/reminder-list-opener.component';
import { ReminderListViewComponent } from './reminder-list-view/reminder-list-view.component';
import { SnoozeViewComponent } from './snooze-view/snooze-view.component';

// Pipe
import { FilterNotesPipePipe } from './filter-notes-pipe.pipe';

// services imports
import { NotesService } from './services/notes.service';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { SocketService } from './services/socket.service';
import { SidebarService } from './services/sidebar.service';
import { ReminderService } from './services/reminder.service';

// guards imports
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { SnoozeOpenerComponent } from './snooze-opener/snooze-opener.component';

// custom routes
const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ CanActivateRouteGuard ],
    children: [
      {
        path: 'view/noteview',
        component: NoteViewComponent
      },
      {
        path: 'view/listview',
        component: ListViewComponent
      },
      {
        path : 'note/:noteId/edit',
        component : EditNoteOpenerComponent,
        outlet : 'noteEditOutlet'
      },
      {
        path : 'note/:noteId/group',
        component : GroupNoteOpenerComponent,
        outlet : 'noteGroupOutlet'
      },
      {
        path : 'note/:noteId/share',
        component : NoteShareOpenerComponent,
        outlet : 'noteShareOutlet'
      },
      {
        path : '',
        redirectTo : 'view/noteview',
        pathMatch : 'full'
      },
      {
        path : 'note/:noteId/remind',
        component : ReminderOpenerComponent,
        outlet : 'noteRemindOutlet'
      },
      {
        path : 'note/reminders',
        component : ReminderListOpenerComponent,
        outlet : 'noteReminderListOutlet'
      },
      {
        path : 'note/reminders/:notificationId/snooze',
        component : SnoozeOpenerComponent,
        outlet : 'noteReminderSnoozeListOutlet'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    HeaderComponent,
    ListViewComponent,
    LoginComponent,
    NoteComponent,
    NoteTakerComponent,
    NoteViewComponent,
    RegisterComponent,
    LogoutComponent,
    GroupNoteOpenerComponent,
    GroupNoteViewComponent,
    SidebarComponent,
    NoteShareOpenerComponent,
    NoteShareViewComponent,
    FilterNotesPipePipe,
    NotificationComponent,
    ReminderOpenerComponent,
    ReminderViewComponent,
    ReminderListOpenerComponent,
    ReminderListViewComponent,
    SnoozeViewComponent,
    SnoozeOpenerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatMenuModule,
    MatAutocompleteModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RouterService,
    AuthenticationService,
    NotesService,
    CanActivateRouteGuard,
    SocketService,
    SidebarService,
    ReminderService
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [
    EditNoteViewComponent,
    GroupNoteViewComponent,
    NoteShareViewComponent,
    ReminderViewComponent,
    ReminderListViewComponent,
    SnoozeViewComponent
   ]
})

export class AppModule { }
