import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameVoteComponent } from './game-vote.component';

describe('GameVoteComponent', () => {
  let component: GameVoteComponent;
  let fixture: ComponentFixture<GameVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameVoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
