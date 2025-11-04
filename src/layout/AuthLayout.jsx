import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <header>
        <Navbar />
      </header>
      <main className="bg-base-100 flex justify-center items-center min-h-[calc(100vh-100px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
