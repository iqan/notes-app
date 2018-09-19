import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Note } from './../note';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { variable } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class NotesService {
  baseUrl = environment.apiGatewayUrl + 'api/v1/notes';
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  filterSubject: BehaviorSubject<string>;
  searchFilterSubject: BehaviorSubject<string>;
  selectedNotes: Array<string>;
  selectedNotesSubject: BehaviorSubject<Array<string>>;

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) {
                this.notes = [];
                this.notesSubject = new BehaviorSubject(this.notes);
                this.selectedNotes = [];
                this.selectedNotesSubject = new BehaviorSubject(this.selectedNotes);
                this.filterSubject = new BehaviorSubject('all');
                this.searchFilterSubject = new BehaviorSubject('');
              }

  fetchNotesFromServer(): void {
    const headers = this.getAuthorizationHeader();
    this.httpClient.get<Array<Note>>(`${this.baseUrl}`, { headers })
      .subscribe(data => {
          this.notes = data;
          this.notesSubject.next(this.notes);
        },
        errro => { }
      );
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    const headers = this.getAuthorizationHeader();
    return this.httpClient.post<Note>(`${this.baseUrl}`, note, { headers })
      .pipe(tap(
        data => {
          this.notes.push(data);
          this.notesSubject.next(this.notes);
        },
        error => { }
      ));
  }

  editNote(note: Note): Observable<Note> {
    const headers = this.getAuthorizationHeader();
    return this.httpClient.put<Note>(`${this.baseUrl}/${note.id}`, note, { headers })
      .pipe(tap(
        data => { this.addNoteToArray(note); },
        error => { }
      ));
  }

  getNoteById(noteId: string): Note {
    const foundNote = this.notes.find(n => n.id === noteId);
    return Object.assign({}, foundNote);
  }

  deleteNoteById(noteId: string): void {
    const headers = this.getAuthorizationHeader();
    const noteToDelete = this.getNoteById(noteId);
    this.httpClient.delete(`${this.baseUrl}/${noteId}`, { headers })
      .subscribe(
        done => {
          const index = this.notes.map(note => {
                          return note.id;
                        }).indexOf(noteId);
          this.notes.splice(index, 1);
          this.notesSubject.next(this.notes);
        },
        err => {}
    );
  }

  showAllNotes(): void {
    this.filterSubject.next('all');
  }

  showNotesInGroup(groupName): void {
    this.filterSubject.next(groupName);
  }

  showFavourites(): void {
    this.filterSubject.next('isFavourite');
  }

  markNoteAsFavourite(noteId): void {
    const note = this.getNoteById(noteId);
    note.isFavourite = true;
    this.editNote(note).subscribe( data => {}, err => {});
  }

  uploadFile(content): void {
    const headers = this.getAuthorizationHeader();
    headers.append('Content-Type', 'multipart/form-data');
    this.httpClient.post<Array<Note>>(`${this.baseUrl}/stream`, content, { headers })
      .subscribe(
        data => {
          data.forEach(note => {
            this.notes.push(note);
            this.notesSubject.next(this.notes);
          });
        },
        error => { }
      );
  }

  shareNotes(userName: string, accessType: string, notes: Array<Note> = null): Observable<string> {
    const headers = this.getAuthorizationHeader();
    const notesToShare = notes ? notes : this.getselectedNotes();
    const content = { collaborator: { userName: userName, type: accessType }, notes: notesToShare };
    return this.httpClient.post<string>(`${this.baseUrl}/share`, content, { headers });
  }

  getFilterSubject() {
    return this.filterSubject;
  }

  getselectedNotes() {
    return this.selectedNotes.map(sn => this.notes.find(n => n.id === sn));
  }

  filterNotes(searchWord: string): void {
    this.searchFilterSubject.next(searchWord);
  }

  getSearchFilter() {
    return this.searchFilterSubject;
  }

  addSharedNote(note) {
    this.notes.push(note);
    this.notesSubject.next(this.notes);
  }

  addNoteAsSelected(noteId: string): void {
    const existingId = this.selectedNotes.indexOf(noteId);
    if (existingId > -1) {
      this.selectedNotes.splice(existingId);
    } else {
      this.selectedNotes.push(noteId);
    }
    this.selectedNotesSubject.next(this.selectedNotes);
  }

  getSelectedNotesSubject(): BehaviorSubject<Array<string>> {
    return this.selectedNotesSubject;
  }

  clearSelectedNotes() {
    this.selectedNotes = [];
    this.selectedNotesSubject.next(this.selectedNotes);
  }

  deleteSelected(): void {
    const headers = this.getAuthorizationHeader();
    this.httpClient.request('delete', `${this.baseUrl}`, { headers: headers, body: this.selectedNotes })
      .subscribe(
        done => {
          this.notes = this.notes.filter(n => this.selectedNotes.indexOf(n.id) === -1);
          this.notesSubject.next(this.notes);
          this.clearSelectedNotes();
        },
        err => {}
    );
  }

  addSelectedToFavourites(): void {
    const headers = this.getAuthorizationHeader();
    this.httpClient.post(`${this.baseUrl}/favourites`, this.selectedNotes, { headers })
      .subscribe(
        done => {
          this.notes = this.notes.map(n => {
            if (this.selectedNotes.indexOf(n.id) > -1) {
              n.isFavourite = true;
            }
            return n;
          });
          this.notesSubject.next(this.notes);
          this.clearSelectedNotes();
        },
        err => {}
    );
  }

  addSelectedToGroup(groupName: string): void {
    const headers = this.getAuthorizationHeader();
    this.httpClient.post(`${this.baseUrl}/group/${groupName}`, this.selectedNotes, { headers })
      .subscribe(
        done => {
          this.notes = this.notes.map(n => {
            if (this.selectedNotes.indexOf(n.id) > -1) {
              n.groupName = groupName;
            }
            return n;
          });
          this.notesSubject.next(this.notes);
          this.clearSelectedNotes();
        },
        err => {}
    );
  }

  private addNoteToArray(note: Note) {
    const noteToEdit = this.notes.find(n => n.id === note.id);
    Object.assign(noteToEdit, note);
    this.notesSubject.next(this.notes);
  }

  private getAuthorizationHeader() {
    const token = this.authenticationService.getBearerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
}
