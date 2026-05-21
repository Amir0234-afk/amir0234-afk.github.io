import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://amir0234-afk.github.io',
  // If deploying to https://amir0234-afk.github.io/portfolio set base: '/portfolio'
  // If using a custom domain or user-site (amir0234-afk.github.io), leave base undefined.
  // base: '/portfolio',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
