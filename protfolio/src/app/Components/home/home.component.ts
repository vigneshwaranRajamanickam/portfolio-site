import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild
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
export class HomeComponent implements AfterViewInit {
  @ViewChild('typingName') typingName!: ElementRef;
  
@ViewChild('homeContent', { static: true }) homeContent!: ElementRef; 
ngAfterViewInit(): void {
  this.typeText('Vigneshwaran', this.typingName.nativeElement);
    gsap.from(this.homeContent.nativeElement, {
      y: 100,
      opacity: 0,
      duration: .1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.homeContent.nativeElement,
        start: 'top 80%', // when top of section hits 80% of viewport
        toggleActions: 'play none none reverse',
      },
    }); 
  }

  typeText(text: string, element: HTMLElement): void {
    let index = 0;
    const typingSpeed = 120;

    const typeChar = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeChar, typingSpeed);
      } else {
        // Optional cursor blink or loop effect
      }
    };

    typeChar();
  }
}
