import { Activity, CalendarDays, FileDown, FileUp } from "lucide-react";

export function usePatientDashboard() {
  return {
    title: "Espace Patient",
    description: "Gérez vos rendez-vous, documents et résultats médicaux.",
    stats: [
      { title: "Prochain RDV", value: "01 Juin 2026", icon: CalendarDays },
      { title: "Diagnostics en cours", value: "2", icon: Activity },
      { title: "Documents envoyés", value: "5", icon: FileUp },
      { title: "Résultats disponibles", value: "3", icon: FileDown },
    ],
  };
}