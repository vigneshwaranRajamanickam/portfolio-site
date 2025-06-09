/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser'; 
import { AppComponent } from './app/app.component'; 
 
import gsap from 'gsap';

function playIntroAnimation(): Promise<void> {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        const preloader = document.getElementById('preloader');
        const appRoot = document.querySelector('app-root') as HTMLElement;

        gsap.to(preloader, {
          opacity: 0,
          duration: 0.05,
          onComplete: () => {
            preloader?.remove();
            gsap.to(appRoot, { opacity: 1, duration: 0.05 });
            resolve();
          },
        });
      },
    });

    tl.from('#pre-name', { y: -50, opacity: 0, duration: 1 })
      .from('#pre-role', { y: 50, opacity: 0, duration: 1 }, '-=0.5');
  });
}

// Play animation first, then bootstrap Angular standalone app:
playIntroAnimation().then(() => {
  bootstrapApplication(AppComponent).catch((err) => console.error(err));
});
