import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experiance',
  templateUrl: './experiance.component.html',
  standalone:true,
  imports: [CommonModule],
  styleUrls: ['./experiance.component.scss']
})
export class ExperianceComponent implements AfterViewInit {
  @ViewChild('experienceSection') experienceSection!: ElementRef;
  experiences =[
  {
    company: 'Centizen Inc.',
    role: 'Software Engineer',
    duration: 'Feb 2023 - Present',
    location: 'Tirunelveli, Tamil Nadu',
    projects: [
      {
        name: 'ZenBasket (E-commerce Platform)',
        points: [
          'Built reusable Angular UI modules (forms, pipes, directives) to improve code scalability and reduce duplication.',
          'Developed a custom price range filter to enhance user experience, reducing repetitive logic by 40%.',
          'Created a shared product detail component used across views, minimizing maintenance overhead by 30%.',
          'Implemented a rich text editor using Angular for CMS flexibility in admin dashboard blocks.',
          'Converted complex Angular components into Angular Elements, reducing bundle size by 75%.',
          'Designed a feature-rich dropdown component (searchable, keyboard accessible) replacing Mat-Select.',
          'Engineered accordion/expansion components with toggle logic and GSAP-powered animations.',
          'Created a modular notification system with timers, animations, and positioning (custom MatSnackBar alternative).',
        ],
      },
      {
        name: 'Zen Studio (Website Builder)',
        points: [
          'Built a dynamic top navigation bar with Preview, Save, Publish, and page management functionality.',
          'Created a flexible draggable side panel UI showcasing reusable sections, elements, and color palettes.',
          'Implemented CSS sprite techniques to optimize asset loading and reduce preview latency.',
          'Developed scalable API integration with clean service structure and reusable HTTP logic.',
        ],
      }
    ]
  }
];
;

  ngAfterViewInit(): void {
    gsap.from(this.experienceSection.nativeElement, {
      x: 100,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: this.experienceSection.nativeElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });
    //   gsap.from(this.experienceSection.nativeElement, {
    //   x: 100,
    //   opacity: 0,
    //   duration: 1.2,
    //   ease: 'power4.out',
    //   scrollTrigger: {
    //     trigger: this.experienceSection.nativeElement,
    //     start: 'top 80%',
    //     toggleActions: 'play none none none'
    //   }
    // })
  }
}
