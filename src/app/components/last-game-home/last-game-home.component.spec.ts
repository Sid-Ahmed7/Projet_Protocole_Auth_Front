import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastGameHomeComponent } from './last-game-home.component';

describe('LastGameHomeComponent', () => {
  let component: LastGameHomeComponent;
  let fixture: ComponentFixture<LastGameHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastGameHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastGameHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
