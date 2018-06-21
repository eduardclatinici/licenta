import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserDataComponent } from './modal-user-data.component';

describe('ModalUserDataComponent', () => {
  let component: ModalUserDataComponent;
  let fixture: ComponentFixture<ModalUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
