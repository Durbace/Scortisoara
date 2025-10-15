import { translocoConfig, TranslocoConfig } from '@jsverse/transloco';

export const translocoConf: TranslocoConfig = translocoConfig({
  availableLangs: ['ro', 'en', 'de'],
  defaultLang: 'ro',
  fallbackLang: 'en',
  reRenderOnLangChange: true,
  prodMode: false
});
