import {
  Outlet,
  /*Link, */
  useNavigation,
} from "react-router-dom";

import Header from "../components/header/Header";
import NavBar from "../components/navbar/NavBar";
import LoadingScreen from '../components/loading/LoadingScreen';
import UpdateNotification from '../components/UpdateNotification/UpdateNotification';
import { useVersionCheck } from '../hooks/useVersionCheck';

function MainLayout() {
  const navigation = useNavigation();
  
  // Hook para verificar atualizações da aplicação
  useVersionCheck();

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
      <UpdateNotification />
    </div>
  );
}

export default MainLayout;