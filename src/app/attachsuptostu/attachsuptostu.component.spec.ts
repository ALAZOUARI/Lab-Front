import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachsuptostuComponent } from './attachsuptostu.component';

describe('AttachsuptostuComponent', () => {
  let component: AttachsuptostuComponent;
  let fixture: ComponentFixture<AttachsuptostuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachsuptostuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachsuptostuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
