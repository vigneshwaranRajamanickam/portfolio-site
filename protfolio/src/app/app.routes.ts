import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Redirect root to 'home'
  {
    path: 'home',
    loadComponent: () =>
      import('./Components/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
];
