import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidebarService {
  sidebarOpen: boolean;
  sidebarSubject: BehaviorSubject<boolean>;

  constructor() {
    this.sidebarSubject = new BehaviorSubject<boolean>(false);
  }

  toggle(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarSubject.next(this.sidebarOpen);
  }

  getSidebarSubject(): BehaviorSubject<boolean> {
    return this.sidebarSubject;
  }
}
