import { Sidebar } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function MainLayout(){
    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div className="flex flex-row flex-1">
                <Sidebar/>
                <div className="flex-1 p-4">
                    <Header/>
                    <Outlet/>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}