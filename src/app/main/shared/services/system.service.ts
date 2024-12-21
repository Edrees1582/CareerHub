import { computed, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  translateService = inject(TranslateService);

  darkMode = signal<boolean>(false);
  language = signal<string>('');
  direction = computed(() => (this.language() === 'ar' ? 'rtl' : 'ltr'));

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

  setLanguage(language?: string) {
    if (!language) language = this.language() === 'ar' ? 'en' : 'ar';

    this.translateService.use(language);

    localStorage.setItem('lang', language);

    this.language.set(language);
    this.setDirection();

    this.toggleThemeClasses();
  }

  setDirection() {
    const dir = this.direction();
    const html = document.querySelector('html');

    html?.setAttribute('lang', this.language());
    html?.setAttribute('dir', dir);
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
}
