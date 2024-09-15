import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HomeheaderComponent } from '../homeheader/homeheader.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from 'express';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, RouterLink, RouterLinkActive],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
