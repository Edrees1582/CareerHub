import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  title = inject(Title);
  translateService = inject(TranslateService);

  constructor() {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot) {
    const title = this.buildTitle(snapshot) || 'CareerHub';

    this.title.setTitle(this.translateService.instant(title));

    this.translateService.onLangChange.subscribe(() => {
      this.title.setTitle(this.translateService.instant(title));
    });
  }
}
