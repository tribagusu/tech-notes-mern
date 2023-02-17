import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Public />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dash",
        element: <DashLayout />,
        children: [
          {
            index: true,
            element: <Welcome />,
          },
          {
            path: "notes",
            element: <NotesList />,
          },
          {
            path: "users",
            element: <UsersList />,
          },
        ],
      },
    ],
  },

  // {
  //   path: "*",
  //   element: <PageError code={404} />,
  // },
]);
