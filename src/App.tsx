import {
  Link,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from '../src/layout/MainLayout'

const router = createBrowserRouter([
  {
    path: "/SuperViaApp/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        // Single route in lazy file
        lazy: () => import("./pages/About"),
      },
      {
        path: "dashboard",
        async lazy() {
          // Multiple routes in lazy file
          const { DashboardLayout } = await import("./pages/Dashboard");
          return { Component: DashboardLayout };
        },
        children: [
          {
            index: true,
            async lazy() {
              const { DashboardIndex } = await import("./pages/Dashboard");
              return { Component: DashboardIndex };
            },
          },
          {
            path: "messages",
            async lazy() {
              const { dashboardMessagesLoader, DashboardMessages } = await import(
                "./pages/Dashboard"
              );
              return {
                loader: dashboardMessagesLoader,
                Component: DashboardMessages,
              };
            },
          },
        ],
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);

export default function App() {
  console.log(router);
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

function Home() {
  return (
    <div>
      <h2>Home welcome</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/SuperViaApp/">Go to the home page</Link>
      </p>
    </div>
  );
}