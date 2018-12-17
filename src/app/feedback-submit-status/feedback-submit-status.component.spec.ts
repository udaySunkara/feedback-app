import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSubmitStatusComponent } from './feedback-submit-status.component';

describe('FeedbackSubmitStatusComponent', () => {
  let component: FeedbackSubmitStatusComponent;
  let fixture: ComponentFixture<FeedbackSubmitStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackSubmitStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackSubmitStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
