// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.bring-o.net',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'ru',
        locales: {
          en: 'en',
          ru: 'ru',
          ro: 'ro',
        },
      },
    }),
  ],
  output: 'hybrid',
  adapter: vercel(),
});
