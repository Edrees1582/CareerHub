import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';

import { BaseComponent } from './main/shared/components/base/base.component';
import { HeaderComponent } from './main/shared/components/header/header.component';
import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatMenuModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('HomePage <=> AboutPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '-100%' })]),
        query(':leave', animateChild()),
        group([
          query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]),
          query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
        ]),
        query(':enter', animateChild()),
      ]),
      transition('* <=> FilterPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '-100%' })]),
        query(':leave', animateChild()),
        group([
          query(':leave', [animate('200ms ease-out', style({ left: '100%' }))]),
          query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
        ]),
        query(':enter', animateChild()),
      ]),
    ]),
  ],
})
export class AppComponent {
  @HostBinding('@.disabled')
  public animationsDisabled = false;

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }
}
