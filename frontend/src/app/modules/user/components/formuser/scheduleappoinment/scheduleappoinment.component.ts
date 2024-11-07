import { Component } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-scheduleappoinment',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent],
  templateUrl: './scheduleappoinment.component.html',
  styleUrl: './scheduleappoinment.component.css'
})
export class ScheduleappoinmentComponent {

}
