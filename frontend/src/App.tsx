import { AuthScreen } from './components/auth/AuthScreen';
import { AssistantDashboard } from './components/dashboard/AssistantDashboard';
import { DoctorDashboard } from './components/dashboard/DoctorDashboard';
import { PatientDashboard } from './components/dashboard/PatientDashboard';
import { useAuth } from './hooks/useAuth';
import { useDashboardData } from './hooks/useDashboardData';

export default function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-600">Chargement de votre espace…</main>;
  }

  if (!auth.user) return <AuthScreen onAuthenticated={auth.authenticate} />;
  return <AuthenticatedDashboard user={auth.user} onLogout={auth.logout} />;
}

function AuthenticatedDashboard({ user, onLogout }: { user: NonNullable<ReturnType<typeof useAuth>['user']>; onLogout: () => Promise<void> }) {
  const dashboard = useDashboardData(user);

  if (dashboard.loading) return <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-600">Chargement de votre tableau de bord…</main>;
  if (dashboard.error || !dashboard.data) return <main className="grid min-h-screen place-items-center bg-slate-50 p-6"><section className="max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm"><h1 className="text-xl font-bold text-slate-900">Tableau de bord indisponible</h1><p role="alert" className="mt-2 text-sm text-slate-600">{dashboard.error}</p><div className="mt-5 flex justify-center gap-3"><button onClick={dashboard.retry} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Réessayer</button><button onClick={() => { void onLogout(); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Se déconnecter</button></div></section></main>;

  if (user.role === 'medecin') return <DoctorDashboard user={user} data={dashboard.data} onLogout={onLogout} />;
  if (user.role === 'assistant') return <AssistantDashboard user={user} data={dashboard.data} onLogout={onLogout} />;
  return <PatientDashboard user={user} data={dashboard.data} onLogout={onLogout} />;
}
