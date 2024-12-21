import { Component } from '@angular/core';

import { BaseComponent } from '../../shared/components/base/base.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-home',
    imports: [MatButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export default class HomeComponent extends BaseComponent {}
