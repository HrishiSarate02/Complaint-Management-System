import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneComplaintsComponent } from './done-complaints.component';

describe('DoneComplaintsComponent', () => {
  let component: DoneComplaintsComponent;
  let fixture: ComponentFixture<DoneComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoneComplaintsComponent]
    });
    fixture = TestBed.createComponent(DoneComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
