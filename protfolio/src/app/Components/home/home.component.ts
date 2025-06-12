import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('typingName', { static: false }) typingName!: ElementRef;
  @ViewChild('homeContent', { static: false }) homeContent!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    if (this.homeContent && this.homeContent.nativeElement) {
      gsap.set(this.homeContent.nativeElement, { opacity: 0, y: 50 });
    }
  }

  ngAfterViewInit(): void {
    if (!this.typingName || !this.homeContent) {
      console.error('HomeComponent: ViewChild elements not found', {
        typingName: this.typingName,
        homeContent: this.homeContent
      });
      return;
    }

    this.typeText('Vigneshwaran', this.typingName.nativeElement);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      this.homeContent.nativeElement,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
      .fromTo(
        '.greeting',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        '.typing-text',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        '.roles',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        '.summary',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        '.cta-buttons .btn',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
        '-=0.3'
      );
  }

  typeText(text: string, element: HTMLElement): void {
    if (!element) {
      console.error('typeText: Element not found');
      return;
    }
    let index = 0;
    const typingSpeed = 120;

    const typeChar = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeChar, typingSpeed);
      }
    };

    typeChar();
  }

  scrollToContact(event: Event): void {
    event.preventDefault();
    const section = document.getElementById('contact');
    if (section) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: section, offsetY: 60 },
        ease: 'power2.out',
      });
    }
  }
}