export class Note {
  id: string;
  title: string;
  text: string;
  state: string;
  isFavourite: boolean;
  group: string;

  constructor() {
    this.title = '';
    this.text = '';
    this.state = 'not-started';
    this.group = null;
    this.isFavourite = false;
  }
}
