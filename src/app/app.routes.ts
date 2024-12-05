import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./main/pages/home/home.component'),
    title: 'navigation.home',
    canActivate: [authGuard],
    data: { animation: 'HomePage' },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'about',
    loadComponent: () => import('./main/pages/about/about.component'),
    title: 'navigation.about',
    canActivate: [authGuard],
    data: { animation: 'AboutPage' },
  },
  {
    path: 'jobs',
    loadComponent: () => import('./main/pages/jobs/jobs.component'),
    title: 'navigation.jobs',
    canActivate: [authGuard],
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./main/shared/components/not-found/not-found.component'),
    title: 'navigation.notFound.title',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
