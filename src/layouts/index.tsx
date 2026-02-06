import { Outlet } from "react-router-dom";
import NavBar from "./navbar";
import SideBar from "./sideBar";

const Layout: React.FC = () => {
  return (
    <>
      <SideBar />
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full rounded-xl transition-all duration-200">
        <NavBar />
        <div className="w-full h-full px-6 py-6 mx-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
