export class Note {
  id: string;
  title: string;
  text: string;
  state: string;
  isFavourite: boolean;
  groupName: string;

  constructor() {
    this.title = '';
    this.text = '';
    this.state = 'not-started';
    this.groupName = null;
    this.isFavourite = false;
  }
}
