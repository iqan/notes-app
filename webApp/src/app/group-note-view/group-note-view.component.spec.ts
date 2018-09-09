import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNoteViewComponent } from './group-note-view.component';

describe('GroupNoteViewComponent', () => {
  let component: GroupNoteViewComponent;
  let fixture: ComponentFixture<GroupNoteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupNoteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
