import { Component } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { BaseComponent } from '../../shared/components/base/base.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export default class AboutComponent extends BaseComponent {
  constructor() {
    super();
  }
}
