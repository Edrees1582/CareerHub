import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { JobService } from '../service/job.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Job } from '../types/job.type';
import { PaginationSearchCriteria } from '../../../shared/types/shared.type';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-jobs-grid',
    imports: [MatTableModule, MatPaginatorModule, TranslateModule],
    templateUrl: './jobs-grid.component.html',
    styleUrl: './jobs-grid.component.scss'
})
export class JobsGridComponent extends BaseComponent implements OnInit {
  private _jobService = inject(JobService);

  dataSource = new MatTableDataSource<Job>();
  displayedColumns: string[] = ['title', 'location', 'company', 'salary'];

  ngOnInit() {
    this.getJobs();

    this.execute$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.getJobs();
    });
  }

  getJobs() {
    const criteria: PaginationSearchCriteria = {
      skip: this.skip(),
      take: this.take(),
    };

    const { jobs, totalCount } = this._jobService.getJobs(criteria);

    this.dataSource.data = jobs;
    this.totalCount.set(totalCount);
  }
}
