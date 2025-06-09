import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
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

  ngAfterViewInit(): void { 
  const sections = ['home', 'about', 'projects', 'contact'];

  sections.forEach((id) => {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => this.activeSection = id,
      onEnterBack: () => this.activeSection = id,
    });
  });

  ScrollTrigger.create({
    trigger: document.body,
    start: "top -10",
    onEnter: () => this.isScrolled = true,
    onLeaveBack: () => this.isScrolled = false,
  }); 

    ScrollTrigger.create({
      start: 'top -10',
      onEnter: () => (this.isScrolled = true),
      onLeaveBack: () => (this.isScrolled = false),
    });
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault(); // ⛔ stop default jump behavior
    const section = document.getElementById(sectionId);
    if (section) {
      gsap.to(window, {
        duration: 0.01,
        scrollTo: { y: section, offsetY: 60 }, // offset for sticky nav
        ease: 'power2.out',
      });

      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    gsap.to(this.mobileMenu.nativeElement, {
      x: this.menuOpen ? 0 : '-100%',
      duration: 0.5,
      ease: 'power3.out',
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
