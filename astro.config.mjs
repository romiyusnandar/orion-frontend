// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://orionos.tech',
  output: 'server',

  vite: {
    plugins: [tailwindcss()]
  },

  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
    ],
  },

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  })
});