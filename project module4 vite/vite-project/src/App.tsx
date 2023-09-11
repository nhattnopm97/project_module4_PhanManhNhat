import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./component/page/Home";
import ZingChart from "./component/page/ZingChart";
import Library from "./component/page/Library";
import NotFound from "./component/page/NotFound";
import Player from "./component/smallcomponent/Player";
import SideBarLeft from "./component/smallcomponent/SideBarLeft";
import Header from "./component/smallcomponent/Header";
import Login from "./component/page/Login";
import Register from "./component/page/Register";
import Upload from "./component/page/Upload";
import PlayList from "./component/page/PlayList";
import NewRelease from "./component/page/NewRelease";
import History from "./component/page/History";
import BasicAlerts from "./component/alert/BasicAlerts";
import Song from "./component/smallcomponent/Song";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
function App() {
  type User = {
    name: string;
    avatar: string;
    email: string;
    password: string;
    repeatPassword: string;
    role: number;
    createDate: string;
    birthday: string;
  };
  type dataUser = {
    message: string;
    token: string;
    status: number;
    data: User;
  };
  type Auth = {
    user: dataUser;
    loading: boolean;
    error: boolean;
  };

  type State = {
    auth: Auth;
  };
  const user = useSelector((state: State) => state.auth.user);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    let userLocalJson = localStorage.getItem("userLocal");
    let userLocal = userLocalJson ? JSON.parse(userLocalJson) : null;
    setCurrentUser(userLocal);
  }, [user]);

  const PrivateRoute = () => {
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <>
      <div className="flex h-full w-full flex-auto overflow-y-auto">
        <SideBarLeft />
        <div className="w-full overflow-y-auto">
          <Header />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/zingchart" element={<ZingChart />}></Route>
              <Route path="/library" element={<Library />}></Route>
              <Route path="/player" element={<Player />}></Route>
              <Route path="/upload" element={<Upload />}></Route>
              <Route path="/newrelease" element={<NewRelease />}></Route>
              <Route path="/history" element={<History />}></Route>
              <Route path="/alert" element={<BasicAlerts />}></Route>
              <Route path="/song/:id" element={<Song />}></Route>
              <Route path="/playlist/:id" element={<PlayList />}></Route>
            </Route>

            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
      <div className="flex-none h-[90px]">
        <Player />
      </div>
    </>
  );
}

export default App;
