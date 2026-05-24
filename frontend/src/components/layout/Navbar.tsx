type NavbarProps = {
  role: string;
  setRole: (role: string) => void;
};

export default function Navbar({
  role,
  setRole,
}: NavbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Bienvenue sur CliniqueMhd
        </p>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
        >
          <option value="PATIENT">Patient</option>
          <option value="ASSISTANT">Assistant</option>
          <option value="MEDECIN">Médecin</option>
          <option value="DIRECTEUR">Directeur</option>
          <option value="ADMIN">Admin</option>
        </select>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          MM
        </div>
      </div>
    </header>
  );
}