import { Component, EventEmitter, HostListener, Inject, inject, Output, Renderer2, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [FlexLayoutModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  @ViewChild('content') templateRef!: TemplateRef<any>;
  private offcanvasService = inject(NgbOffcanvas)  
  isScrolled: boolean=false;
  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}
  @Output() navigateToSection = new EventEmitter<string>();
  currentSection: string = 'home';
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section');
          if (id) this.currentSection = id;
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of section is visible

    const sections = this.document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));
  }
  navigate(section: string) {
    this.navigateToSection.emit(section);
  }
}
