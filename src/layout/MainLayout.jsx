import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <header className="max-w-7xl mx-auto sticky top-0 z-99">
        <Navbar />
      </header>
      <main className="bg-base-100 max-w-10/12 mx-auto min-h-screen">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default MainLayout;
