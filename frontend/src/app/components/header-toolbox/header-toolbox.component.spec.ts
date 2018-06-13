import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderToolboxComponent } from './header-toolbox.component';

describe('HeaderToolboxComponent', () => {
  let component: HeaderToolboxComponent;
  let fixture: ComponentFixture<HeaderToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
