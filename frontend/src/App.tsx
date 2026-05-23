import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
export default function App(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout/>}>
            <Route path="/" element={<PatientDashboard/>}/>
            <Route path="/patient" element={<PatientDashboard/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}