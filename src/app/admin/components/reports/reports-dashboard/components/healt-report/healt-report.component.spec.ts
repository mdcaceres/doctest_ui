import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealtReportComponent } from './healt-report.component';

describe('HealtReportComponent', () => {
  let component: HealtReportComponent;
  let fixture: ComponentFixture<HealtReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealtReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealtReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
