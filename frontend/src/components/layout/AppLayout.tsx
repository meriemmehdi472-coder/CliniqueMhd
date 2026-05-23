import {Outlet} from "react-router-dom";
import  Sidebar  from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout(){
    return(
        <div className="mini-h-screen bg-slate-50">
        
            <Sidebar/>

            <div className="ml-64">
                <Navbar/>

                <main className="p-8">
                    <Outlet/>
                </main>
            </div>
        </div>


    )
}