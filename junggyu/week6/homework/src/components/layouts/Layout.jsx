import { Outlet } from "react-router-dom";
import  Navbar  from "./Navbar";

export const Layout = () => {
    return (
        <div className="  ">
            <Navbar />
            <div className="w-100% pt-20  bg-black min-h-screen text-white ">
                <Outlet />
            </div>
        </div>
    )
}