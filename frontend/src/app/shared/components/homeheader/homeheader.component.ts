import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-homeheader',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './homeheader.component.html',
  styleUrl: './homeheader.component.css'
})
export class HomeheaderComponent {

}
