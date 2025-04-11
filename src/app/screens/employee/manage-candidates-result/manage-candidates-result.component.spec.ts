import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCandidatesResultComponent } from './manage-candidates-result.component';

describe('ManageCandidatesResultComponent', () => {
  let component: ManageCandidatesResultComponent;
  let fixture: ComponentFixture<ManageCandidatesResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCandidatesResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageCandidatesResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
