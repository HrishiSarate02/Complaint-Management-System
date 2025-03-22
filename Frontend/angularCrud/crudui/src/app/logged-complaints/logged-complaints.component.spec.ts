import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedComplaintsComponent } from './logged-complaints.component';

describe('LoggedComplaintsComponent', () => {
  let component: LoggedComplaintsComponent;
  let fixture: ComponentFixture<LoggedComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedComplaintsComponent]
    });
    fixture = TestBed.createComponent(LoggedComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
