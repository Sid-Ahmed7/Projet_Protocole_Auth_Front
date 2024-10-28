import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRecommendationComponent } from './game-recommendation.component';

describe('GameRecommendationComponent', () => {
  let component: GameRecommendationComponent;
  let fixture: ComponentFixture<GameRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRecommendationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
