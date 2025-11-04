import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <header className="max-w-7xl mx-auto">
        <Navbar />
      </header>
      <main className="bg-base-100">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default MainLayout;
