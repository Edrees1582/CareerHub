import {
  Component,
  computed,
  inject,
  OnDestroy,
  Renderer2,
  signal,
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Subject, takeUntil } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Pagination } from '../../types/shared.type';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent implements OnDestroy {
  protected translateService = inject(TranslateService);
  protected renderer = inject(Renderer2);

  protected darkMode = signal<boolean>(false);
  protected language = signal<string>('');
  protected direction = computed(() =>
    this.language() === 'ar' ? 'rtl' : 'ltr'
  );

  protected skip = signal<number>(Pagination.SKIP);
  protected take = signal<number>(Pagination.TAKE);
  protected totalCount = signal<number>(0);

  protected execute$ = new Subject<boolean>();
  protected destroy$ = new Subject<void>();

  constructor() {
    this.translateService.addLangs(environment.languages);
    this.translateService.setDefaultLang(environment.defaultLanguage);

    const lang = localStorage.getItem('lang');
    if (lang) this.setLanguage(lang);
    else this.setLanguage(environment.defaultLanguage);

    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) this.toggleDarkMode(true);
    else this.toggleDarkMode(false);
  }

  setLanguage(language: string) {
    this.translateService
      .use(language)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        localStorage.setItem('lang', language);

        this.language.set(language);
        this.setDirection();

        this.toggleThemeClasses();
      });
  }

  setDirection() {
    const dir = this.direction();
    this.renderer.setAttribute(
      document.documentElement,
      'lang',
      this.language()
    );
    this.renderer.setAttribute(document.documentElement, 'dir', dir);
  }

  toggleDarkMode(isDarkMode?: boolean) {
    if (isDarkMode !== undefined) this.darkMode.set(isDarkMode);
    else this.darkMode.update((prev) => !prev);

    this.toggleThemeClasses();

    if (this.darkMode()) localStorage.setItem('darkMode', 'true');
    else localStorage.removeItem('darkMode');
  }

  toggleThemeClasses() {
    document.body.classList.remove(
      'dark-theme-arabic',
      'dark-theme-english',
      'light-theme-arabic',
      'light-theme-english'
    );
    if (this.darkMode()) {
      if (this.language() === 'ar')
        document.body.classList.add('dark-theme-arabic');
      else document.body.classList.add('dark-theme-english');
    } else {
      if (this.language() === 'ar')
        document.body.classList.add('light-theme-arabic');
      else document.body.classList.add('light-theme-english');
    }
  }

  onPageChange(event: PageEvent) {
    this.skip.set(event.pageIndex * event.pageSize);
    this.take.set(event.pageSize);

    this.execute$.next(true);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
