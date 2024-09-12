import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataappoinmentComponent } from './dataappoinment.component';

describe('DataappoinmentComponent', () => {
  let component: DataappoinmentComponent;
  let fixture: ComponentFixture<DataappoinmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataappoinmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataappoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
