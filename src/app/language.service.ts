import { Injectable, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslocoService } from '@jsverse/transloco';

export const SUPPORTED = ['ro', 'en', 'de'] as const;
export type Lang = (typeof SUPPORTED)[number];
const DEFAULT_LANG: Lang = 'ro';
function isLang(val: any): val is Lang {
  return (SUPPORTED as readonly string[]).includes(val);
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _current = signal<Lang>(DEFAULT_LANG);
  current = this._current;

  readonly supported = SUPPORTED;
  readonly defaultLang: Lang = DEFAULT_LANG;

  private transloco = inject(TranslocoService);

  constructor(private router: Router) {
    const start = this.extractFromUrl(this.router.url);
    this._current.set(start);
    this.transloco.setActiveLang(start);

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const fromUrl = this.extractFromUrl(this.router.url);
        if (fromUrl !== this._current()) {
          this._current.set(fromUrl);
          this.transloco.setActiveLang(fromUrl);
        }
      });
  }

  switch(lang: Lang) {
    if (!isLang(lang)) lang = this.defaultLang;

    const url = this.router.url.split('?')[0].split('#')[0];
    const parts = url.split('/').filter(Boolean);

    if (parts.length && isLang(parts[0])) parts[0] = lang;
    else parts.unshift(lang);

    const fragment =
      this.router.parseUrl(this.router.url).fragment ?? undefined;

    this.router.navigate(['/', ...parts], {
      queryParamsHandling: 'preserve',
      fragment,
    });
    this._current.set(lang);
    this.transloco.setActiveLang(lang);
  }

  private extractFromUrl(url: string): Lang {
    const first = url.split('?')[0].split('#')[0].split('/').filter(Boolean)[0];
    return isLang(first) ? first : this.defaultLang;
  }
}
