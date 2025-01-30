import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { authClient } from '../auth';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  const { data, isPending } = authClient.useSession();

  const testApi = async () => {
    const response = await fetch('/api/me');
    const data = await response.text();
    console.log(data);
  };

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {isPending && <p>Loading...</p>}
      {data ? (
        <div>
          <p>Logged in as: {data.user.email}</p>
          <button type="button" onClick={testApi}>
            Test API
          </button>
          <button type="button" onClick={() => authClient.signOut()}>
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      )}
    </div>
  );
}
