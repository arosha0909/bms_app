import NavBar from "./navbar";
import SideBar from "./sideBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <SideBar />
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
      <NavBar />
        <div className="w-full h-full px-6 py-6 mx-auto">
            {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
