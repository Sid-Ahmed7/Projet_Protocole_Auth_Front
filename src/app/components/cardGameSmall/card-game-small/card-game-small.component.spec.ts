import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGameSmallComponent } from './card-game-small.component';

describe('CardGameSmallComponent', () => {
  let component: CardGameSmallComponent;
  let fixture: ComponentFixture<CardGameSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGameSmallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardGameSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
