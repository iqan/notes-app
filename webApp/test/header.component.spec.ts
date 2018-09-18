// import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
// import { HeaderComponent } from '../src/app/header/header.component';
// import { By } from '@angular/platform-browser';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatListModule } from '@angular/material/list';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatButtonModule } from '@angular/material/button';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatIconModule } from '@angular/material/icon';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Location } from '@angular/common';
// import { RouterService } from '../src/app/services/router.service';
// import { AuthenticationService } from '../src/app/services/authentication.service';
// import { SidebarService } from '../src/app/services/sidebar.service';
// import { NotesService } from '../src/app/services/notes.service';
// import { BehaviorSubject } from 'rxjs';
// import { HttpClientModule } from '@angular/common/http';
// import {
//   routes,
//   EditNoteOpenerDummyComponent,
//   LoginDummyComponent,
//   ListViewDummyComponent,
//   NoteViewDummyComponent,
//   DashboardDummyComponent,
//   AppDummyComponent,
//   LogoutDummyComponent
// } from './routes.test';
// import { FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

// describe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;
//   let debugElement: any;
//   let element: any;
//   let router: Router;
//   let location: Location;
//   let authService: AuthenticationService;
//   let spyIsAuthenticated: any;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//       HeaderComponent,
//       EditNoteOpenerDummyComponent,
//       LoginDummyComponent,
//       ListViewDummyComponent,
//       NoteViewDummyComponent,
//       DashboardDummyComponent,
//       AppDummyComponent,
//       LogoutDummyComponent
//       ],
//       imports: [
//       RouterTestingModule.withRoutes(routes),
//       HttpClientModule,
//       MatAutocompleteModule,
//       MatCheckboxModule,
//       MatDatepickerModule,
//       MatFormFieldModule,
//       MatInputModule,
//       MatRadioModule,
//       MatSelectModule,
//       MatSliderModule,
//       MatSlideToggleModule,
//       MatMenuModule,
//       MatSidenavModule,
//       MatToolbarModule,
//       MatCardModule,
//       MatExpansionModule,
//       MatGridListModule,
//       MatListModule,
//       MatStepperModule,
//       MatTabsModule,
//       MatButtonModule,
//       MatButtonToggleModule,
//       MatChipsModule,
//       MatIconModule,
//       MatProgressSpinnerModule,
//       MatProgressBarModule,
//       MatDialogModule,
//       MatSnackBarModule,
//       MatTooltipModule,
//       MatPaginatorModule,
//       MatSortModule,
//       MatTableModule,
//       FormsModule,
//       MatInputModule,
//       NoopAnimationsModule
//       ],
//       providers: [ RouterService, AuthenticationService, SidebarService, NotesService ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HeaderComponent);
//     router =  TestBed.get(Router);
//     location = TestBed.get(Location);
//     authService = TestBed.get(AuthenticationService);
//     spyIsAuthenticated = spyOn(authService, 'getAuthenticatedSubject').and.returnValue(BehaviorSubject.of(false));
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the header component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should handle navigation to list view', fakeAsync(() => {
//     component.isAuthenticated = true;
//     component.isNoteView = true;
//     const menu = fixture.debugElement.query(By.css('.menu-opener'));
//     if (menu) {
//       menu.nativeElement.click();
//       debugElement = fixture.debugElement.query(By.css('.switchToListView'));
//       if (debugElement) {
//         element = debugElement.nativeElement;
//         element.click();
//         tick();
//         expect(location.path()).toContain('/dashboard/view/listview',
//           `should navigate to list view page`);
//       } else {
//         expect(false).toBe(true,
//           `should have an element with class 'switchToListView' in your header.component.html`);
//       }
//     } else {
//       expect(false).toBe(true,
//         `should have an element with class 'menu-opener' in your header.component.html`);
//     }
//   }));

//   it('should handle navigation to note view', fakeAsync(() => {
//     component.isAuthenticated = true;
//     component.isNoteView = false;
//     fixture.detectChanges();
//     debugElement = fixture.debugElement.query(By.css('.switchToNoteView'));
//     if (debugElement) {
//       element = debugElement.nativeElement;
//       element.click();
//       tick();
//       expect(location.path()).toContain('/dashboard/view/noteview',
//         `should navigate to note view page`);
//     } else {
//       expect(false).toBe(true,
//         `should have an element with class 'switchToNoteView' in your header.component.html`);
//     }
//   }));

//   it('should show Logout when user is authenticated', fakeAsync(() => {
//     component.isAuthenticated = true;
//     fixture.detectChanges();
//     debugElement = fixture.debugElement.query(By.css('#btnLogout'));
//     if (debugElement) {
//       const nElement = debugElement.nativeElement;
//       expect(nElement.textContent).toBe('Logout', 'when user is authenticated, Logout button should be visible');
//     } else {
//       expect(false).toBe(true, `should have an element with id 'btnLogout' in header.componenet.html`);
//     }
//   }));

//   it('should show Login when user is authenticated', fakeAsync(() => {
//     component.isAuthenticated = false;
//     fixture.detectChanges();
//     debugElement = fixture.debugElement.query(By.css('#btnLogin'));
//     if (debugElement) {
//       const nElement = debugElement.nativeElement;
//       expect(nElement.textContent).toBe('Login', 'when user is authenticated, Login button should be visible');
//     } else {
//       expect(false).toBe(true, `should have an element with id 'btnLogin' in header.componenet.html`);
//     }
//   }));

//   it('should handle navigation to login view', fakeAsync(() => {
//     component.isAuthenticated = false;
//     fixture.detectChanges();
//     debugElement = fixture.debugElement.query(By.css('#btnLogin'));
//     if (debugElement) {
//       element = debugElement.nativeElement;
//       element.click();
//       tick();
//       expect(location.path()).toContain('/login',
//         `should navigate to login view page`);
//     } else {
//       expect(false).toBe(true,
//         `should have an element with id 'btnLogin' in your header.component.html`);
//     }
//   }));

//   it('should handle navigation to logout view', fakeAsync(() => {
//     component.isAuthenticated = true;
//     fixture.detectChanges();
//     debugElement = fixture.debugElement.query(By.css('#btnLogout'));
//     if (debugElement) {
//       element = debugElement.nativeElement;
//       element.click();
//       tick();
//       expect(location.path()).toContain('/logout',
//         `should navigate to note logout page:${location.path()}`);
//     } else {
//       expect(false).toBe(true,
//         `should have an element with id 'btnLogout' in your header.component.html`);
//     }
//   }));
// });
