import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { envSchema } from './src/env';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'production') {
    return {
      plugins: [TanStackRouterVite({}), react()],
    };
  }

  const env = envSchema.parse(loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [TanStackRouterVite({}), react()],
    server: {
      proxy: {
        [env.API_PATH_PREFIX]: {
          target: env.API_TARGET,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.API_PATH_PREFIX}`), ''),
        },
      },
    },
  };
});
