import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filterNotesPipe'})
export class MockPipe implements PipeTransform {
    transform(notes: any, args?: any): any {
        return notes;
    }
}
