import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCandidateCardComponent } from './selected-candidate-card.component';

describe('SelectedCandidateCardComponent', () => {
  let component: SelectedCandidateCardComponent;
  let fixture: ComponentFixture<SelectedCandidateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedCandidateCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectedCandidateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
