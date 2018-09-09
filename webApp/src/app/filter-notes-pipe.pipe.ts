import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './note';
import { NotesService } from './services/notes.service';

@Pipe({
  name: 'filterNotesPipe',
  pure: false
})
export class FilterNotesPipePipe implements PipeTransform {
  filter: string;

  constructor(private notesService: NotesService) {
    this.notesService.getFilterSubject().subscribe(filter => {
      this.filter = filter;
    });
  }

  transform(notes: Array<Note>, args?: any): any {
    if (this.filter === 'all') {
      return notes;
    }
    if (this.filter === 'isFavourite') {
      return notes.filter(note => note.isFavourite);
    }
    return notes.filter(note => note.groupName === this.filter);
  }

}
