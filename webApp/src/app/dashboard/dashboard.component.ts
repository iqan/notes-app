import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { MatSidenav } from '@angular/material';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  @ViewChild('sidenav') public sidenav: MatSidenav;

  private _mobileQueryListener: () => void;

  constructor(private notesService: NotesService, private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher, private sidenavService: SidebarService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.notesService.fetchNotesFromServer();
  }

  ngOnInit() {
    this.sidenavService.getSidebarSubject().subscribe(() => this.sidenav.toggle());
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
