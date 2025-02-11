import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '@/components/login-form';
import { z } from 'zod';

const redirectSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  validateSearch: redirectSchema,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
