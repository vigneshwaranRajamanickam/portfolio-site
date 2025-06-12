import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "../home/home.component";
import { AboutMeComponent } from "../about-me/about-me.component";
import { ViewportScroller } from '@angular/common';
import { ContactComponent } from "../contact/contact.component";
import { ExperianceComponent } from "../experiance/experiance.component";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing',
  imports: [NavComponent, HomeComponent, AboutMeComponent, ContactComponent, ExperianceComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit, AfterViewInit {
  @ViewChild('homeSection') homeSection!: ElementRef;
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('projectsSection') projectsSection!: ElementRef;
  @ViewChild('contactSection') contactSection!: ElementRef;

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    document.getElementById('loading_content')?.classList.add("hidden-loading");
    // Force scroll to home section on load
    this.scrollToSection('home');
  }

  ngAfterViewInit() {
    // Vertical animation for navbar on load
    gsap.fromTo(
      '.nav-list',
      { y: -50, opacity: 0 }, // Start: 50px above, invisible
      {
        y: 0, // End: original position
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      }
    );

    // Array of sections for scroll-triggered animations
    const sections = [
      { ref: this.homeSection, selector: '#home' },
      { ref: this.aboutSection, selector: '#about' },
      { ref: this.projectsSection, selector: '#projects' },
      { ref: this.contactSection, selector: '#contact' }
    ];

    // Vertical and horizontal animations for each section
    sections.forEach((section, index) => {
      // Initial vertical animation on load (staggered by section)
      gsap.fromTo(
        section.selector,
        { y: 50, opacity: 0 }, // Start: 50px below, invisible
        {
          y: 0, // End: original position
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.4 + index * 0.2 // Stagger by 0.2s per section
        }
      );

      // Scroll-triggered horizontal animation
      gsap.fromTo(
        section.selector,
        { x: -100, opacity: 0 }, // Start: 100px left, invisible
        {
          x: 0, // End: original position
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.selector,
            start: 'top 80%', // When top of section hits 80% of viewport
            end: 'top 20%', // End when top hits 20% of viewport
            toggleActions: 'play none none reverse' // Play on enter, reverse on leave
          }
        }
      );
    });
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: section, offsetY: 60 }, // Offset for sticky nav
        ease: 'power2.out'
      });
    }
  }
}