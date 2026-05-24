import { useOutletContext } from "react-router-dom";

import PatientDashboard from "../components/Dashboard/PatientDashboard";
import StaffDashboard from "../components/Dashboard/StaffDashboard";
import ManagementDashboard from "../components/Dashboard/ManagementDashboard";

type OutletContextType = {
  role: string;
};

export default function DashboardPage() {
  const { role } =
    useOutletContext<OutletContextType>();

  switch (role) {
    case "PATIENT":
      return <PatientDashboard />;

    case "ASSISTANT":
      return <StaffDashboard role="ASSISTANT" />;

    case "MEDECIN":
      return <StaffDashboard role="MEDECIN" />;

    case "DIRECTEUR":
      return (
        <ManagementDashboard role="DIRECTEUR" />
      );

    case "ADMIN":
      return (
        <ManagementDashboard role="ADMIN" />
      );

    default:
      return <div>Accès refusé</div>;
  }
}