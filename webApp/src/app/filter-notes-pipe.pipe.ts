import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './note';
import { NotesService } from './services/notes.service';

@Pipe({
  name: 'filterNotesPipe',
  pure: false
})
export class FilterNotesPipePipe implements PipeTransform {
  filter: string;
  searchWord: string;

  constructor(private notesService: NotesService) {
    this.notesService.getFilterSubject().subscribe(filter => {
      this.filter = filter;
    });

    this.notesService.getSearchFilter().subscribe(s => {
      this.searchWord = s;
    });
  }

  transform(notes: Array<Note>, args?: any): any {
    notes = notes.filter(n => n.title.toLowerCase().includes(this.searchWord) ||
      n.text.toLowerCase().includes(this.searchWord));
    if (this.filter === 'all') {
      return notes;
    }
    if (this.filter === 'isFavourite') {
      return notes.filter(note => note.isFavourite);
    }
    return notes.filter(note => note.groupName === this.filter);
  }
}
