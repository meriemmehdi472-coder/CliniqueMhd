import { AuthScreen } from './components/auth/AuthScreen';
import { PatientDashboard } from './components/dashboard/PatientDashboard';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-600">Chargement de votre espace…</main>;
  }

  if (!auth.user) return <AuthScreen onAuthenticated={auth.authenticate} />;
  return <PatientDashboard user={auth.user} onLogout={auth.logout} />;
}
