import { 
    LayoutDashboard,
    CalendarDays,
    FileText,
    Users,
    Shield,
    Settings,
    LogOut,
} from "lucide-react";


const links = [
    {label: "Dashboard" , icon: LayoutDashboard},
    {label: "Rendez-vous", icon: CalendarDays},
    {label: "Documents", icon: FileText},
    {label: "Utilisateurs", icon: Users },
    {label: "Sécurité", icon: Shield},
    {label: "Paramétres", icon: Settings},
];

export default function Sidebar(){
    return(
        <aside className="fixed left-0 top-0 h-screen w-64 border-slate-200 bg-white px-4 py-6">
            <div className="mb-10">
                <h1 className="text-xl font-bold text-blue-600"> CliniqueMhd</h1>
                <p className="text-xs text-slate-500"> Plateforme Médicale</p>
            </div>

            <nav className="space-y-2" >
                {links.map((item )=> {
                    const Icon = item.icon;
                    return(
                        <button key={item.label}
                        className = "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
                            <Icon size={18}/>
                            {item.label}
                        </button>
                    );
                })}
            </nav>
            <button className="absolute bottom-6 left-4 right-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50">
                Déconnexion
            </button>
        </aside>
    )
}
