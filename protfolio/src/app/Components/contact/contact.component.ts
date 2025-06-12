import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef;

  ngAfterViewInit() {
    gsap.from(this.contactSection.nativeElement, {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: this.contactSection.nativeElement,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }
}
