import { CalendarDays, FileUp, FileDown, Activity } from "lucide-react";

const cards = [
    {
        title: "Prochain rendez-vous",
        value: "01 juin 2026",
        icon: CalendarDays,
    },
    {
        title: "Diagnostique en cours ",
        value: "2",
        icon: Activity,
    },
    {
        title: "Documents envoyés ",
        value: "5",
        icon: FileUp,
    },
    {
        title: "Résultats disponibles",
        value: "3",
        icon: FileDown,
    },
];

export default function PatientDashboard() {
    return (
        <>
            <div className="space-y-8" >
                <section>
                    <h1 className="text-3xl font-bold text-slate-900" >
                        Espace Patient
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Gérez vos rendez-vous, documents et résultats médicaux.
                    </p>
                </section>

                <section className="grid grap-6 md:grid-cols-2 xl:grid-cols-4" >
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.title}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600" >
                                    <Icon size={22} />
                                </div>

                                <p className="text-sm text-slate-500" >{card.title}</p>
                                <p className="mt-2 text-2xl font-bold text-slate-900" >{card.value}</p>
                            </div>
                        );
                    })}
                </section>
                <section className="grid gap-6 lg:grid-cols-2" >
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" >
                        <h2 className="text-lg font-semibold text-slate-900" >
                            Mes Rendez-vous
                        </h2>
                        <div className="mt-5 space-y-4" >
                            <div className="rounded-xl border border-slate-200 p-4" >
                                <p className="font-medium text-slate-900" >
                                    Consultation cardiologie
                                </p>
                                <p className="text-sm text-slate-500" >
                                    01 juin 2026 . 10:00 - 10:30
                                </p>
                                <span className="mt-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600" >
                                    Confirmé
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Documents médicaux
                        </h2>

                        <div className="mt-5 rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
                            <FileUp className="mx-auto text-blue-600" size={32} />
                            <p className="mt-3 font-medium text-slate-900">
                                Téléverser un document
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                PDF, JPG ou PNG accepté
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}