import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'ZoeBike — Benefits of Biking for Rider & Planet',
  },
  {
    path: 'sustainability',
    loadComponent: () =>
      import('./pages/sustainability/sustainability').then((m) => m.Sustainability),
    title: 'ZoeBike — Sustainability & Shared Mobility',
  },
  {
    path: 'sustainability/cities',
    loadComponent: () =>
      import('./pages/sustainability/sustainability-cities').then((m) => m.SustainabilityCities),
    data: {section: 'cities'},
    title: 'ZoeBike — Cities & Local Bike Commerce',
  },
  {
    path: 'sustainability/cities/parking',
    loadComponent: () =>
      import('./pages/sustainability/sustainability-cities').then((m) => m.SustainabilityCities),
    data: {section: 'parking'},
    title: 'ZoeBike — PEZ-Style Vertical Bike Parking',
  },
  {
    path: 'sustainability/cities/la',
    loadComponent: () =>
      import('./pages/sustainability/sustainability-cities').then((m) => m.SustainabilityCities),
    data: {section: 'la'},
    title: 'ZoeBike — Los Angeles 28 by ’28 Biking Vision',
  },
  {
    path: 'sustainability/cities/ny',
    loadComponent: () =>
      import('./pages/sustainability/sustainability-cities').then((m) => m.SustainabilityCities),
    data: {section: 'ny'},
    title: 'ZoeBike — New York Cycling Corridors',
  },
  {
    path: 'sustainability/micro-mobility',
    loadComponent: () =>
      import('./pages/sustainability/sustainability-micromobility').then(
        (m) => m.SustainabilityMicroMobility,
      ),
    data: {section: 'micro-mobility'},
    title: 'ZoeBike — Smart Cities & Micro Mobility',
  },
  {
    path: 'sustainability/micro-mobility/cycle-rickshaw',
    loadComponent: () =>
      import('./pages/sustainability/sustainability-micromobility').then(
        (m) => m.SustainabilityMicroMobility,
      ),
    data: {section: 'cycle-rickshaw'},
    title: 'ZoeBike — Electric Cycle Rickshaws & Bike Cabs',
  },
  {
    path: 'sustainability/micro-mobility/e-mobility',
    loadComponent: () =>
      import('./pages/sustainability/sustainability-micromobility').then(
        (m) => m.SustainabilityMicroMobility,
      ),
    data: {section: 'e-mobility'},
    title: 'ZoeBike — eMobility Solution: eTruck, eBike & Phone Fix',
  },
  {
    path: 'tech',
    loadComponent: () => import('./pages/tech/tech').then((m) => m.Tech),
    title: 'ZoeBike — Tech, Why Bike & Safety Architecture',
  },
  {
    path: 'tech/app',
    loadComponent: () => import('./pages/tech/tech-subpages').then((m) => m.TechSubpages),
    data: {section: 'app'},
    title: 'ZoeBike — AshBike, Swift & GoSwift Cycling Apps',
  },
  {
    path: 'tech/app/gamification',
    loadComponent: () => import('./pages/tech/tech-subpages').then((m) => m.TechSubpages),
    data: {section: 'gamification'},
    title: 'ZoeBike — AR & VR Cycling Gamification',
  },
  {
    path: 'tech/app/hud',
    loadComponent: () => import('./pages/tech/tech-subpages').then((m) => m.TechSubpages),
    data: {section: 'hud'},
    title: 'ZoeBike — Smart Glass Cycling HUD',
  },
  {
    path: 'tech/features',
    loadComponent: () => import('./pages/tech/tech-subpages').then((m) => m.TechSubpages),
    data: {section: 'features'},
    title: 'ZoeBike — Intelligent Route Planning & Bike Tuning',
  },
  {
    path: 'tech/features/functions',
    loadComponent: () => import('./pages/tech/tech-subpages').then((m) => m.TechSubpages),
    data: {section: 'functions'},
    title: 'ZoeBike — Smartphone & Bicycle Sensor Fusion',
  },
  {
    path: 'tech/electric-brakes',
    loadComponent: () => import('./pages/tech/tech-subpages').then((m) => m.TechSubpages),
    data: {section: 'electric-brakes'},
    title: 'ZoeBike — Regenerative & Anti-Lock Front Brakes',
  },
  {
    path: 'bikes',
    loadComponent: () => import('./pages/bikes/bikes').then((m) => m.Bikes),
    title: 'ZoeBike — Bikes & Customizer Studio',
  },
  {
    path: 'store',
    loadComponent: () => import('./pages/store/store').then((m) => m.Store),
    data: {section: 'store'},
    title: 'ZoeBike — Store & H₂E-Bike Vision',
  },
  {
    path: 'store/concept',
    loadComponent: () => import('./pages/store/store').then((m) => m.Store),
    data: {section: 'concept'},
    title: 'ZoeBike — Future E-Bike Concepts',
  },
  {
    path: 'club',
    loadComponent: () => import('./pages/club/club').then((m) => m.Club),
    title: 'ZoeBike — Zoe Club & Rider Stories',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'ZoeBike — About Our AI Mobility Mission',
  },
  {
    path: 'info',
    loadComponent: () => import('./pages/info/info').then((m) => m.Info),
    data: {section: 'info'},
    title: 'ZoeBike — BicycleBrain Info & Mobile Health Tech',
  },
  {
    path: 'info/contact',
    loadComponent: () => import('./pages/info/info').then((m) => m.Info),
    data: {section: 'contact'},
    title: 'ZoeBike — Contact Us',
  },
  {
    path: 'info/contact/app-privacy-policy',
    loadComponent: () => import('./pages/info/info').then((m) => m.Info),
    data: {section: 'privacy'},
    title: 'ZoeBike — App Privacy Policy',
  },
  {
    path: 'info/contact/eula',
    loadComponent: () => import('./pages/info/info').then((m) => m.Info),
    data: {section: 'eula'},
    title: 'ZoeBike — End User License Agreement (EULA)',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
