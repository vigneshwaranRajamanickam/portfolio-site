import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { LandingComponent } from "./Components/landing/landing.component"; 

@Component({
  selector: 'app-root',
  imports: [LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'protfolio'; 
}
