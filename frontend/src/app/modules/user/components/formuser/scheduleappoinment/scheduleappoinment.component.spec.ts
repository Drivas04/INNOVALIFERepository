import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleappoinmentComponent } from './scheduleappoinment.component';

describe('ScheduleappoinmentComponent', () => {
  let component: ScheduleappoinmentComponent;
  let fixture: ComponentFixture<ScheduleappoinmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleappoinmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleappoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
