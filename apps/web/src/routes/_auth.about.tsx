import { authClient } from '@/auth';
import {
  Link,
  Outlet,
  createFileRoute,
  useRouter,
} from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_auth/about')({
  component: AuthLayout,
});

function AuthLayout() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const { t } = useTranslation();

  // the hook
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      authClient.signOut().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: '/' });
        });
      });
    }
  };

  return (
    <div className="p-2 h-full">
      <h1>
        {t('title', {
          name: 'helle',
          adsa: '',
        })}
      </h1>
      <p>This route's content is only visible to authenticated users.</p>
      <ul className="py-2 flex gap-2">
        <li>
          <Link
            to="/"
            className="hover:underline data-[status='active']:font-semibold"
          >
            Dashboard
          </Link>
        </li>
        {/* <li>
          <Link
            to="/invoices"
            className="hover:underline data-[status='active']:font-semibold"
          >
            Invoices
          </Link>
        </li> */}
        <li>
          <button
            type="button"
            className="hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
