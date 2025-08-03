import {
  Link,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from '../src/layout/MainLayout'
import LoadingScreen from "./components/loading/LoadingScreen";
import Home from './pages/home/Home';
import CalcTintaEsfera from "./pages/calcTintaEsfera/CalcTintaEsfera";
import CalcConsumo from "./pages/calcConsumo/calcConsumo";

const router = createBrowserRouter([
  {
    path: "/SuperviaApp",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "CalcTintaEsfera",
        element: <CalcTintaEsfera />,
      },
      {
        path: "CalcConsumo",
        element: <CalcConsumo />,
      },
      {
        path: "about",
        // Single route in lazy file
        lazy: () => import("./pages/about"),
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);

export default function App() {
  //console.log(router);
  return <RouterProvider router={router} fallbackElement={<LoadingScreen></LoadingScreen>} />;
}

/* function Home() {
  return (
    <div>
      <h2>Home welcome</h2>
    </div>
  );
} */

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/SuperviaApp">Go to the home page</Link>
      </p>
    </div>
  );
}