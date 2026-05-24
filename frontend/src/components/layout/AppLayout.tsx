import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout() {
  const [role, setRole] = useState("ADMIN");

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar role={role} />

      <div className="ml-64">
        <Navbar
          role={role}
          setRole={setRole}
        />

        <main className="p-8">
          <Outlet context={{ role }} />
        </main>
      </div>
    </div>
  );
}