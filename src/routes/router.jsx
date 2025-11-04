import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Models from "../pages/Models";
import ModelDetails from "../pages/ModelDetails";
import PrivateRouter from "./PrivateRouter";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import AuthLayout from "../layout/AuthLayout";

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
      {
        path: "/models",
        element: <Models />,
        loader: async () => {
          const res = await fetch("http://localhost:3000/models");
          return res.json();
        },
      },
      {
        path: "/model-details/:id",
        element: (
          <PrivateRouter>
            <ModelDetails />
          </PrivateRouter>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `http://localhost:3000/model-details/${params.id}`
          );
          return res.json();
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
