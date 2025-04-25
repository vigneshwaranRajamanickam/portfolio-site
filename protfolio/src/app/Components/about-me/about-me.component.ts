import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-about-me',
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
   animations: [
    trigger('slideUp', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(50px)',
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)',
      })),
      transition('hidden => visible', animate('600ms ease-out')),
    ])
  ]
})
export class AboutMeComponent {
  isVisible = false;

  onIntersection(entries: IntersectionObserverEntry[] |any) {
    const entry = entries[0];
    if (entry.isIntersecting) {
      this.isVisible = true;
    }
  }
}
