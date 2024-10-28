import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInformationsComponent } from './edit-informations.component';

describe('EditInformationsComponent', () => {
  let component: EditInformationsComponent;
  let fixture: ComponentFixture<EditInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
