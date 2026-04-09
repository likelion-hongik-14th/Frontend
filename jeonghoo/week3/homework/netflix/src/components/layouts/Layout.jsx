import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black pt-16">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;