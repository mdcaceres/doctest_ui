import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugDashboardComponent } from './bug-dashboard.component';

describe('BugDashboardComponent', () => {
  let component: BugDashboardComponent;
  let fixture: ComponentFixture<BugDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
