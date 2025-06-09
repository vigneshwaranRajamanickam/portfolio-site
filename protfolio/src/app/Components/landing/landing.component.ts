import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "../home/home.component";
import { AboutMeComponent } from "../about-me/about-me.component";
import { ViewportScroller } from '@angular/common';
import { ContactComponent } from "../contact/contact.component";
import { ExperianceComponent } from "../experiance/experiance.component";

@Component({
  selector: 'app-landing',
  imports: [NavComponent, HomeComponent, AboutMeComponent, ContactComponent, ExperianceComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  @ViewChild('homeSection') homeSection!: ElementRef;
  @ViewChild('aboutSection') aboutSection!: ElementRef;

  ngOnInit(){ 
      document.getElementById('loading_content')?.classList.add("hidden-loading") 
  }
  constructor(private viewportScroller: ViewportScroller) {}

  scrollToSection(sectionId: string) {
    this.viewportScroller.scrollToAnchor(sectionId);
  }
}
