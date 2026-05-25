import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export const Layout = () => {
  return (
    <div>
      <Navbar />
      {/* Navbar 높이 모바일 16(64px) / 데스크탑 20(80px) 만큼 띄움 */}
      <div className="pt-16 dt:pt-20 bg-black text-white min-h-screen">
        <Outlet />
      </div>
    </div>
  )
}
