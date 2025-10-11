import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'retete',
    loadComponent: () =>
      import('./components/retete/retete.component').then(
        (m) => m.ReteteComponent
      ),
  },

  {
    path: 'tipuri',
    loadComponent: () =>
      import('./components/tipuri/tipuri.component').then(
        (m) => m.TipuriComponent
      ),
  },
];
