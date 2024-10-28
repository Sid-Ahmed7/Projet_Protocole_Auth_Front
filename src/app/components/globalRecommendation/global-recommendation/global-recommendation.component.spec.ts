import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalRecommendationComponent } from './global-recommendation.component';

describe('GlobalRecommendationComponent', () => {
  let component: GlobalRecommendationComponent;
  let fixture: ComponentFixture<GlobalRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalRecommendationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
