import {
  CalendarDays,
  FileText,
  Send,
  Activity,
  Users,
} from "lucide-react";

type StaffRole = "ASSISTANT" | "MEDECIN";

export function useStaffDashboard(role: StaffRole) {
  const dashboards = {
    ASSISTANT: {
      title: "Espace Assistant(e)",
      description:
        "Gestion rapide des rendez-vous, documents et résultats médicaux.",

      stats: [
        {
          title: "RDV aujourd'hui",
          value: "14",
          icon: CalendarDays,
        },
        {
          title: "Documents reçus",
          value: "8",
          icon: FileText,
        },
        {
          title: "Résultats envoyés",
          value: "21",
          icon: Send,
        },
        {
          title: "Patients du jour",
          value: "11",
          icon: Users,
        },
      ],
    },

    MEDECIN: {
      title: "Espace Médecin",
      description:
        "Consultez vos patients, dossiers et diagnostics.",

      stats: [
        {
          title: "Consultations",
          value: "12",
          icon: Activity,
        },
        {
          title: "Patients suivis",
          value: "84",
          icon: Users,
        },
        {
          title: "Documents reçus",
          value: "9",
          icon: FileText,
        },
        {
          title: "Résultats envoyés",
          value: "18",
          icon: Send,
        },
      ],
    },
  };

  return dashboards[role];
}