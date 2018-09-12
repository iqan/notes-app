import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderListViewComponent } from './reminder-list-view.component';

describe('ReminderListViewComponent', () => {
  let component: ReminderListViewComponent;
  let fixture: ComponentFixture<ReminderListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
