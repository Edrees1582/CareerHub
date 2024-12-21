import { Component, inject, OnDestroy, signal } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Subject } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';
import { SystemService } from '../../services/system.service';
import { Pagination } from '../../types/shared.type';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  providers: [SystemService],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent implements OnDestroy {
  protected translateService = inject(TranslateService);
  systemService = inject(SystemService);

  protected skip = signal<number>(Pagination.SKIP);
  protected take = signal<number>(Pagination.TAKE);
  protected totalCount = signal<number>(0);

  protected execute$ = new Subject<boolean>();
  protected destroy$ = new Subject<boolean>();

  onPageChange(event: PageEvent) {
    this.skip.set(event.pageIndex * event.pageSize);
    this.take.set(event.pageSize);

    this.execute$.next(true);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
