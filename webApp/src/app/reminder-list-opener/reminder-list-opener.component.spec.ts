import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderListOpenerComponent } from './reminder-list-opener.component';

describe('ReminderListOpenerComponent', () => {
  let component: ReminderListOpenerComponent;
  let fixture: ComponentFixture<ReminderListOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderListOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderListOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
