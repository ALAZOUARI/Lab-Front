import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullmemberComponent } from './fullmember.component';

describe('FullmemberComponent', () => {
  let component: FullmemberComponent;
  let fixture: ComponentFixture<FullmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullmemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
