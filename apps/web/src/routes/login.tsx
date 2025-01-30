import { createFileRoute } from '@tanstack/react-router';
import { authClient } from '../auth';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const asd = await authClient.signIn.email({ email, password });

    console.log(asd);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
