import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataconfirmComponent } from './dataconfirm.component';

describe('DataconfirmComponent', () => {
  let component: DataconfirmComponent;
  let fixture: ComponentFixture<DataconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataconfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
