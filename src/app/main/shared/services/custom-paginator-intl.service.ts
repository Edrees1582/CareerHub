import { Component, inject, Injectable } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomPaginatorIntlService implements MatPaginatorIntl {
  changes = new Subject<void>();
  translate = inject(TranslateService);

  firstPageLabel = this.translate.instant('paginator.firstPage');
  itemsPerPageLabel = this.translate.instant('paginator.itemsPerPage');
  lastPageLabel = this.translate.instant('paginator.lastPage');
  nextPageLabel = this.translate.instant('paginator.nextPage');
  previousPageLabel = this.translate.instant('paginator.previousPage');

  constructor() {
    this.translate.onLangChange.subscribe(() => {
      this.firstPageLabel = this.translate.instant('paginator.firstPage');
      this.itemsPerPageLabel = this.translate.instant('paginator.itemsPerPage');
      this.lastPageLabel = this.translate.instant('paginator.lastPage');
      this.nextPageLabel = this.translate.instant('paginator.nextPage');
      this.previousPageLabel = this.translate.instant('paginator.previousPage');
      this.changes.next();
    });
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.translate.instant('paginator.page1of1');
    }
    const amountPages = Math.ceil(length / pageSize);
    return this.translate.instant('paginator.pageOf', {
      page: page + 1,
      amountPages,
    });
  }
}
