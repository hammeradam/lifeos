import type { authClient } from '@/auth';
import { ThemeProvider } from '@/components/theme-provider';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import React from 'react';

interface MyRouterContext {
  session: null | ReturnType<typeof authClient.getSession>;
}

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </ThemeProvider>
  );
}
