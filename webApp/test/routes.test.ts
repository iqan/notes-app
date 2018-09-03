import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dummy-edit-note-open',
    template: '<p>Dummy</p>'
})
export class EditNoteOpenerDummyComponent { }

@Component({
    selector: 'app-dummy-login',
    template: '<p>Dummy</p>'
})
export class LoginDummyComponent { }

@Component({
    selector: 'app-dummy-logout',
    template: '<p>Dummy</p>'
})
export class LogoutDummyComponent { }

@Component({
    selector: 'app-dummy-list-view',
    template: '<p>Dummy</p>'
})
export class ListViewDummyComponent { }

@Component({
    selector: 'app-dummy-note-view',
    template: '<p>Dummy</p>'
})
export class NoteViewDummyComponent { }

@Component({
    selector: 'app-dummy-dashboard',
    template: '<p>Dummy</p>'
})
export class DashboardDummyComponent { }

@Component({
    selector: 'app-dummy',
    template: '<p>Dummy</p>'
})
export class AppDummyComponent { }

export const routes: Routes = [
    {
        path: 'login',
        component: LoginDummyComponent
    },
    {
        path: 'logout',
        component: LogoutDummyComponent
    },
    {
        path: 'dashboard',
        component: DashboardDummyComponent,
        children: [
            {
                path: 'view/noteview',
                component: NoteViewDummyComponent
            },
            {
                path: 'view/listview',
                component: ListViewDummyComponent
            },
            {
                path : 'note/:noteId/edit',
                component : EditNoteOpenerDummyComponent,
                outlet : 'noteEditOutlet'
            },
            {
                path : '',
                redirectTo : 'view/noteview',
                pathMatch : 'full'
            }
        ]
    },
    {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
    }
];
