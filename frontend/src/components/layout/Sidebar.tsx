import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useSidebarLinks } from "../../hooks/dashboard/useSidebarLinks";

type SidebarProps = {
  role: string;
};

export default function Sidebar({
  role,
}: SidebarProps) {
  const links = useSidebarLinks(role);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white px-4 py-6">
      <div className="mb-10">
        <h1 className="text-xl font-bold text-blue-600">
          CliniqueMhd
        </h1>

        <p className="text-xs text-slate-500">
          Plateforme Médicale
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <button className="absolute bottom-6 left-4 right-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50">
        <LogOut size={18} />
        Déconnexion
      </button>
    </aside>
  );
}