import { Component} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event} from '@angular/router';
import { CommonModule } from '@angular/common';
import { IStaticMethods } from 'preline/preline';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(private router: Router){}
 
  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            window.HSStaticMethods?.autoInit();
          }, 100);
        }
      });
    }
  }
  
}
