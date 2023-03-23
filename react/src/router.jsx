import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login";
import Auth from "./views/Auth";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import DashBoard from "./views/DashBoard";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children:[
      {
        path: '/',
        element: <Navigate to="/users" />
      },
      {
        path: '/dashboard',
        element: <DashBoard />
      },
      {
        path: '/users',
        element: <Users />
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children:[
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/auth',
        element: <Auth />
      },
    ]
  },


  {
    path: '*',
    element: <NotFound />
  },
])

export default router;
