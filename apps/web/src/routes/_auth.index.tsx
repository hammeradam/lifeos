import { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { authClient } from '@/auth';

export const Route = createFileRoute('/_auth/')({
  component: HomeComponent,
});

function HomeComponent() {
  const { data, isPending } = authClient.useSession();
  const [test, setTest] = useState(null);
  const navigate = useNavigate();

  const testApi = async () => {
    const response = await fetch('/api/me');
    const data = await response.json();
    setTest(data);
  };

  console.log(data);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {isPending && <p>Loading...</p>}
      <Link to="/about">about</Link>
      <div>
        {/* <p>Logged in as: {data!.user.email}</p> */}
        <button type="button" onClick={testApi}>
          Test API
        </button>
        <button
          type="button"
          onClick={async () => {
            await authClient.signOut();

            navigate({
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
