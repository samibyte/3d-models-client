import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Models from "../pages/Models";
import ModelDetails from "../pages/ModelDetails";
import PrivateRouter from "./PrivateRouter";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import AuthLayout from "../layout/AuthLayout";
import AddModel from "../pages/AddModel";
import MyModel from "../pages/MyModel";
import MyDownloads from "../pages/MyDownloads";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <div>loading...</div>,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          const res = await fetch(
            "https://3d-models-hub-server-three.vercel.app/latest-models"
          );
          return res.json();
        },
      },
      {
        path: "/models",
        element: <Models />,
        loader: async () => {
          const res = await fetch(
            "https://3d-models-hub-server-three.vercel.app/models"
          );
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
      },
      {
        path: "/add-model",
        element: (
          <PrivateRouter>
            <AddModel />
          </PrivateRouter>
        ),
      },
      {
        path: "/my-model",
        element: (
          <PrivateRouter>
            <MyModel />
          </PrivateRouter>
        ),
      },
      {
        path: "/my-downloads",
        element: (
          <PrivateRouter>
            <MyDownloads />
          </PrivateRouter>
        ),
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
