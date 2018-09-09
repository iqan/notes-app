import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  groups = Array<string>();

  constructor(private notesService: NotesService) {
    this.notesService.getNotes().subscribe(notes => {
      this.groups = notes.map(n => n.groupName)
        .filter((value, index, self) => self.indexOf(value) === index && value !== undefined);
    });
  }

  ngOnInit() {
  }

  showAllNotes() {
    this.notesService.showAllNotes();
  }

  showNotesInGroup(group) {
    this.notesService.showNotesInGroup(group);
  }

  showFavourites() {
    this.notesService.showFavourites();
  }
}
