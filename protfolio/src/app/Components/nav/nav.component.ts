import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements AfterViewInit {
  isScrolled = false;
  menuOpen = false;
  activeSection: string = 'home';

  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const sections = ['home', 'about', 'projects', 'contact'];

    sections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          this.activeSection = id;
          this.cdr.detectChanges();
        },
        onEnterBack: () => {
          this.activeSection = id;
          this.cdr.detectChanges();
        },
      });
    });

    gsap.fromTo(
      '.navbar',
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      }
    );

    gsap.fromTo(
      '.nav-links.desktop li',
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        delay: 0.4
      }
    );

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -10',
      onEnter: () => {
        this.isScrolled = true;
        this.cdr.detectChanges();
      },
      onLeaveBack: () => {
        this.isScrolled = false;
        this.cdr.detectChanges();
      }
    });
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      console.log(`Navigating to section: ${sectionId}`);
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: section, offsetY: 60 },
        ease: 'power2.out',
      });
      this.closeMenu();
    } else {
      console.error(`Section with ID "${sectionId}" not found`);
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    gsap.to(this.mobileMenu.nativeElement, {
      x: this.menuOpen ? 0 : '-100%',
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        if (this.menuOpen) {
          gsap.fromTo(
            '.mobile-menu li',
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.2
            }
          );
        }
      },
    });
  }

  closeMenu(): void {
    this.menuOpen = false;
    gsap.to(this.mobileMenu.nativeElement, {
      x: '-100%',
      duration: 0.5,
      ease: 'power3.inOut',
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.closeMenu();
    }
  }
}