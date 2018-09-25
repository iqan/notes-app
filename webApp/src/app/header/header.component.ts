import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { SidebarService } from '../services/sidebar.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNoteView = true;
  isAuthenticated = false;
  search: string;
  isNoteSelected = false;
  selectedNotesCount: number;

  constructor(private routesService: RouterService,
              private authService: AuthenticationService,
              private sidebarService: SidebarService,
              private notesService: NotesService) {
  }

  ngOnInit() {
    this.authService.getAuthenticatedSubject().subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    this.notesService.getSelectedNotesSubject().subscribe(n => {
      this.isNoteSelected = n.length > 0;
      this.selectedNotesCount = n.length;
    });
  }

  switchToListView() {
    this.routesService.routeToListView();
    this.isNoteView = false;
  }

  switchToNoteView() {
    this.routesService.routeToNoteView();
    this.isNoteView = true;
  }

  login() {
    this.routesService.routeToLogin();
  }

  logout() {
    this.routesService.routeToLogout();
    this.isAuthenticated = false;
  }

  register() {
    this.routesService.routeToRegister();
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  searchChanged() {
    this.notesService.filterNotes(this.search);
  }

  unSelectAll() {
    this.notesService.clearSelectedNotes();
  }

  deleteNotes() {
    this.notesService.deleteSelected();
  }

  markAsFavourite() {
    this.notesService.addSelectedToFavourites();
  }

  addToGroup() {
    this.routesService.routeToAddToGroupView('multiple');
  }

  shareNotes() {
    this.routesService.routeToShareNoteView('multiple');
  }
}
