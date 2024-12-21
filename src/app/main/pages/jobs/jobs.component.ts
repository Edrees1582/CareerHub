import { Component } from '@angular/core';
import { JobsGridComponent } from './jobs-grid/jobs-grid.component';

@Component({
    selector: 'app-jobs',
    imports: [JobsGridComponent],
    templateUrl: './jobs.component.html',
    styleUrl: './jobs.component.scss'
})
export default class JobsComponent {}
