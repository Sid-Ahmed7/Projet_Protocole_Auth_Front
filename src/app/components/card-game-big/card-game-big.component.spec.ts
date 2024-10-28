import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGameBigComponent } from './card-game-big.component';

describe('CardGameBigComponent', () => {
  let component: CardGameBigComponent;
  let fixture: ComponentFixture<CardGameBigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGameBigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardGameBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
