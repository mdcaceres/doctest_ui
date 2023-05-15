import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuiteComponent } from './create-suite.component';

describe('CreateSuiteComponent', () => {
  let component: CreateSuiteComponent;
  let fixture: ComponentFixture<CreateSuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSuiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
