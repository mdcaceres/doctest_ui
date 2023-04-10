import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamspaceDashboardComponent } from './teamspace-dashboard.component';

describe('TeamspaceDashboardComponent', () => {
  let component: TeamspaceDashboardComponent;
  let fixture: ComponentFixture<TeamspaceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamspaceDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamspaceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
