import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { envSchema } from './env';

export default defineConfig(({ mode }) => {
  const env = envSchema.parse(loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react()],
    server: {
      proxy: {
        [env.AUTH_SERVICE_PATH_PREFIX]: {
          target: env.AUTH_SERVICE_TARGET,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.AUTH_SERVICE_PATH_PREFIX}`), ''),
        },
      },
    },
  };
});
