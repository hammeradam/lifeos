import { RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import './index.css';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  // context: {
  //   // auth: authClient,
  // },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// biome-ignore lint/style/noNonNullAssertion: app will be there
const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<RouterProvider router={router} />);
}
