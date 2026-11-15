import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'ZoeBike — Effortless Electric Commuters',
  },
  {
    path: 'bikes',
    loadComponent: () => import('./pages/bikes/bikes').then((m) => m.Bikes),
    title: 'ZoeBike — Bikes & Customizer Studio',
  },
  {
    path: 'tech',
    loadComponent: () => import('./pages/tech/tech').then((m) => m.Tech),
    title: 'ZoeBike — Architecture, Tech & Safety',
  },
  {
    path: 'club',
    loadComponent: () => import('./pages/club/club').then((m) => m.Club),
    title: 'ZoeBike — Zoe Club & Stories',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'ZoeBike — About Our AI Mobility Mission',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
