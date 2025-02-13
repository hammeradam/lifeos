import type { resources } from '../i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    // Extract the translation type from the resources
    resources: typeof resources.en;
  }
}
