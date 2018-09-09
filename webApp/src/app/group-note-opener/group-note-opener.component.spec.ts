import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNoteOpenerComponent } from './group-note-opener.component';

describe('GroupNoteOpenerComponent', () => {
  let component: GroupNoteOpenerComponent;
  let fixture: ComponentFixture<GroupNoteOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupNoteOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNoteOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
