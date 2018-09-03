import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNoteView = true;
  isAuthenticated = false;

  constructor(private routesService: RouterService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.getAuthenticatedSubject().subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
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
}
