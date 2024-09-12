import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseractivityComponent } from './useractivity.component';

describe('UseractivityComponent', () => {
  let component: UseractivityComponent;
  let fixture: ComponentFixture<UseractivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseractivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseractivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
