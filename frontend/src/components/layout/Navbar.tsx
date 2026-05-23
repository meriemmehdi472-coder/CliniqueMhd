import {Bell , Search} from "lucide-react";

export default function Navbar(){

    return(
        <>
        <header className="flex h-20 items-center justify-between border-slate-200 bg-white px-8">
            <div>
                <h2 className="text-xl font-semibold text-slate-900" >Tabeleau de bord</h2>
                <p className="text-sm test-slate-500"> Bienvuenue sur CliniqueMhd</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 md:flex" >
                    <Search size={18} className="text-slate-400"/>
                    <input 
                        placeholder="Rechercher..."
                        className="bg-transparent text-sm outline-none"
                    />
                </div>
                <button className="rounded-xl border border-slate-200 p-3 text-slate-500 hover:bg-slate-50">
                    <Bell size={18}/>
                </button>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white" >
                    M
                </div>
            </div>
        </header>
        </>
    );
}