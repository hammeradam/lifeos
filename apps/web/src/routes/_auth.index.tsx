import { authClient } from '@/auth';
import { env } from '@/env';
import { Link, createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_auth/')({
  component: HomeComponent,
});

function HomeComponent() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const [test, setTest] = useState(null);

  const testApi = async () => {
    const response = await fetch(new URL('/me', env.VITE_API_BASE_URL), {
      credentials: 'include',
    });
    const data = await response.json();
    setTest(data);
  };

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {isPending && <p>Loading...</p>}
      <Link to="/about">about</Link>
      <div>
        <p>Logged in as: {data?.user.email}</p>
        <button type="button" onClick={testApi}>
          Test API
        </button>
        <button
          type="button"
          onClick={async () => {
            await authClient.signOut();

            router.navigate({
              to: '/login',
            });
          }}
        >
          Sign Out
        </button>
        <code>
          <pre>{JSON.stringify(test, null, 2)}</pre>
        </code>
      </div>
    </div>
  );
}
