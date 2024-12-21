import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { BaseComponent } from '../base/base.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    MatMenuModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends BaseComponent {
  languages = this.translateService.getLangs();
  filteredLanguages = this.languages.filter(
    (lang) => lang !== this.translateService.currentLang
  );

  constructor() {
    super();
  }
}
