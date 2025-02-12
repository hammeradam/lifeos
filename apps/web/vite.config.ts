import path from 'node:path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { type UserConfig, defineConfig, loadEnv } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { VitePWA } from 'vite-plugin-pwa';
import { z } from 'zod';

export const envSchema = z.object({
  API_PATH_PREFIX: z.string(),
  API_TARGET: z.string(),
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const config: UserConfig = {
    plugins: [
      TanStackRouterVite({}),
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        includeAssets: ['favicon.ico'],
        manifest: {
          name: 'My PWA App',
          short_name: 'PWA',
          description: 'My Awesome PWA',
          icons: [
            {
              src: '/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
          theme_color: '#18181b',
          background_color: '#18181b',
          display: 'standalone',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };

  if (env.ANALYZE === 'true') {
    config.plugins?.push(
      analyzer({
        analyzerMode: 'server',
      }),
    );
  }

  if (mode === 'development') {
    const env = envSchema.parse(loadEnv(mode, process.cwd(), ''));

    config.server = {
      proxy: {
        [env.API_PATH_PREFIX]: {
          target: env.API_TARGET,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.API_PATH_PREFIX}`), ''),
        },
      },
    };
  }

  return config;
});
