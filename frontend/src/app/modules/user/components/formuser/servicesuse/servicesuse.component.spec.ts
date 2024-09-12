import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesuseComponent } from './servicesuse.component';

describe('ServicesuseComponent', () => {
  let component: ServicesuseComponent;
  let fixture: ComponentFixture<ServicesuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesuseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
