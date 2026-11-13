import type { DashboardSection } from '../../types/clinic';

const links: { id: DashboardSection; icon: string; label: string }[] = [
  { id: 'accueil', icon: '⌂', label: 'Accueil' },
  { id: 'rdv', icon: '▦', label: 'Prendre un rendez-vous' },
  { id: 'document', icon: '▤', label: 'Envoyer un document' },
  { id: 'dossier', icon: '▣', label: 'Mon dossier médical' },
  { id: 'parametres', icon: '⚙', label: 'Paramètres & Profil' },
];

export function Sidebar({ active, onNavigate, onLogout }: {
  active: DashboardSection;
  onNavigate: (section: DashboardSection) => void;
  onLogout: () => void;
}) {
  return <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white p-4 md:min-h-screen md:w-72 md:border-r md:border-b-0 md:p-6">
    <div className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900 md:mb-10">
      <span className="text-2xl">🩺</span><span>Clinique<span className="text-sky-600">Mhd</span></span>
    </div>
    <nav className="flex gap-2 overflow-x-auto md:flex-col" aria-label="Navigation principale">
      {links.map(link => <button key={link.id} onClick={() => onNavigate(link.id)}
        className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${active === link.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
        <span className="text-lg" aria-hidden="true">{link.icon}</span>{link.label}
      </button>)}
    </nav>
    <button className="mt-5 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 md:mt-auto" onClick={onLogout}>↪ Se déconnecter</button>
  </aside>;
}
