import {
  Outlet,
  /*Link, */
  useNavigation,
} from "react-router-dom";

import Header from "../components/header/Header";
import NavBar from "../components/navbar/NavBar";
import LoadingScreen from '../components/loading/LoadingScreen';

function MainLayout() {
  const navigation = useNavigation();

  return (
    <div id="base">
      <Header></Header>
      <div id="content">
        <div style={{ position: "fixed", top: 0, right: 0 }}>
          {navigation.state !== "idle" && <LoadingScreen></LoadingScreen>}
        </div>
        <Outlet />
      </div>
      <NavBar></NavBar>
    </div>
  );
}

export default MainLayout;