import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  groups = Array<string>();
  highligted: string;

  constructor(private notesService: NotesService,
    private routerService: RouterService) {
    this.notesService.getNotes().subscribe(notes => {
      this.groups = notes.map(n => n.groupName)
        .filter((value, index, self) => {
          return self.indexOf(value) === index && value;
        });
    });
    this.highligted = 'all';
  }

  ngOnInit() {
  }

  showAllNotes() {
    this.notesService.showAllNotes();
    this.highligted = 'all';
  }

  showNotesInGroup(group) {
    this.notesService.showNotesInGroup(group);
    this.highligted = group;
  }

  showFavourites() {
    this.notesService.showFavourites();
    this.highligted = 'fav';
  }

  showReminders() {
    this.routerService.routeToReminderListView();
  }
}
