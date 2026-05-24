import {
  Users,
  ShieldAlert,
  CalendarX,
  Activity,
  Ban,
  UserCog,
} from "lucide-react";

type ManagementRole = "DIRECTEUR" | "ADMIN";

export function useManagementDashboard(
  role: ManagementRole
) {
  const dashboards = {
    DIRECTEUR: {
      title: "Espace Directeur",
      description:
        "Supervision globale des activités de la clinique.",

      stats: [
        {
          title: "Demandes clients",
          value: "32",
          icon: Users,
        },
        {
          title: "Actions prioritaires",
          value: "12",
          icon: Activity,
        },
        {
          title: "RDV annulés",
          value: "7",
          icon: CalendarX,
        },
        {
          title: "Comptes bloqués",
          value: "3",
          icon: ShieldAlert,
        },
      ],
    },

    ADMIN: {
      title: "Backoffice Administrateur",
      description:
        "Gestion complète de la plateforme CliniqueMhd.",

      stats: [
        {
          title: "Utilisateurs",
          value: "243",
          icon: Users,
        },
        {
          title: "Employés",
          value: "18",
          icon: UserCog,
        },
        {
          title: "Comptes suspendus",
          value: "4",
          icon: Ban,
        },
        {
          title: "Actions admin",
          value: "15",
          icon: ShieldAlert,
        },
      ],
    },
  };

  return dashboards[role];
}