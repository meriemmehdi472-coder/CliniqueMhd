import { AuthScreen } from './components/auth/AuthScreen';
import { AssistantDashboard } from './components/dashboard/AssistantDashboard';
import { DoctorDashboard } from './components/dashboard/DoctorDashboard';
import { PatientDashboard } from './components/dashboard/PatientDashboard';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-600">Chargement de votre espace…</main>;
  }

  if (!auth.user) return <AuthScreen onAuthenticated={auth.authenticate} />;
  if (auth.user.role === 'medecin') return <DoctorDashboard user={auth.user} onLogout={auth.logout} />;
  if (auth.user.role === 'assistant') return <AssistantDashboard user={auth.user} onLogout={auth.logout} />;
  return <PatientDashboard user={auth.user} onLogout={auth.logout} />;
}
