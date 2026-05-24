import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Users,
  Shield,
  Settings,
  Activity,
  ClipboardList,
} from "lucide-react";

export function useSidebarLinks(role: string) {
  const common = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
  ];

  const linksByRole = {
    PATIENT: [
      ...common,
      {
        label: "Rendez-vous",
        icon: CalendarDays,
        path: "/appointments",
      },
      {
        label: "Documents",
        icon: FileText,
        path: "/documents",
      },
      {
        label: "Résultats",
        icon: Activity,
        path: "/results",
      },
    ],

    ASSISTANT: [
      ...common,
      {
        label: "Planning",
        icon: CalendarDays,
        path: "/planning",
      },
      {
        label: "Documents",
        icon: FileText,
        path: "/documents",
      },
      {
        label: "Transmissions",
        icon: ClipboardList,
        path: "/transmissions",
      },
    ],

    MEDECIN: [
      ...common,
      {
        label: "Patients",
        icon: Users,
        path: "/patients",
      },
      {
        label: "Consultations",
        icon: ClipboardList,
        path: "/consultations",
      },
      {
        label: "Diagnostics",
        icon: Activity,
        path: "/diagnostics",
      },
    ],

    DIRECTEUR: [
      ...common,
      {
        label: "Demandes",
        icon: ClipboardList,
        path: "/requests",
      },
      {
        label: "Rendez-vous",
        icon: CalendarDays,
        path: "/appointments",
      },
      {
        label: "Patients",
        icon: Users,
        path: "/patients",
      },
    ],

    ADMIN: [
      ...common,
      {
        label: "Utilisateurs",
        icon: Users,
        path: "/admin/users",
      },
      {
        label: "Sécurité",
        icon: Shield,
        path: "/admin/security",
      },
      {
        label: "Paramètres",
        icon: Settings,
        path: "/admin/settings",
      },
    ],
  };

  return (
    linksByRole[
      role as keyof typeof linksByRole
    ] ?? common
  );
}