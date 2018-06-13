import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHotelComponent } from './pet-hotel.component';

describe('PetHotelComponent', () => {
  let component: PetHotelComponent;
  let fixture: ComponentFixture<PetHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
