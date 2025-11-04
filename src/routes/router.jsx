import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          const res = await fetch("http://localhost:3000/latest-models");
          return res.json();
        },
      },
    ],
  },
]);

export default router;
