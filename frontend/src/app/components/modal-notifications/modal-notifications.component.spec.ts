import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotificationsComponent } from './modal-notifications.component';

describe('ModalNotificationsComponent', () => {
  let component: ModalNotificationsComponent;
  let fixture: ComponentFixture<ModalNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
