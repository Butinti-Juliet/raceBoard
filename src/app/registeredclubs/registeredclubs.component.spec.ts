import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredclubsComponent } from './registeredclubs.component';

describe('RegisteredclubsComponent', () => {
  let component: RegisteredclubsComponent;
  let fixture: ComponentFixture<RegisteredclubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredclubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredclubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
