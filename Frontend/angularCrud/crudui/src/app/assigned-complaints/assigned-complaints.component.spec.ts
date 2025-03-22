import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedComplaintsComponent } from './assigned-complaints.component';

describe('AssignedComplaintsComponent', () => {
  let component: AssignedComplaintsComponent;
  let fixture: ComponentFixture<AssignedComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedComplaintsComponent]
    });
    fixture = TestBed.createComponent(AssignedComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
