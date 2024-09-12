import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeheaderComponent } from './homeheader.component';

describe('HomeheaderComponent', () => {
  let component: HomeheaderComponent;
  let fixture: ComponentFixture<HomeheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
