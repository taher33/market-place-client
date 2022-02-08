import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import ProtectRoute from "./components/protectdrout";
import Scrolltotop from "./components/scrolltotop";
import Categories from "./pages/categories";
import Chat from "./pages/Chat";
import Landing from "./pages/Main";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SingleProduct from "./pages/SingleProduct";
import { AppContext, searchCtx } from "./utils/context";
import io, { Socket } from "socket.io-client";
import { useQuery } from "react-query";
import { axios_instance } from "./utils/axios";
import { Response, User } from "./utils/types";
import Upload from "./pages/Upload";
import Search from "./pages/Search";

function App(): JSX.Element {
  const [user, setUser] = useState<User>();
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    const newSocket =
      process.env.NODE_ENV === "development"
        ? io("http://localhost:8080/")
        : io(process.env.REACT_APP_CHAT_ENDPOINT_PROD!);

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log("disconnect");
    };
  }, [setSocket]);

  const { isLoading } = useQuery(
    "login",
    () =>
      axios_instance(true)({
        method: "GET",
        url: "users/checkLogin",
      }),
    {
      onSuccess: (data) => {
        setUser(data.data.user);
        let payload = {
          user: data.data.user,
        };
        socket?.emit("connect to server", payload, (res: Response) => {
          if (res.status === "error") return console.log(res.data);
        });
      },
    }
  );

  const [search, setSearch] = useState<string>();

  return (
    <AppContext.Provider value={{ user, setUser, socket, setSocket }}>
      <searchCtx.Provider value={{ search }}>
        <div>
          <Navbar setSearch={setSearch} />
          <Scrolltotop />
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>
            <ProtectRoute loading={isLoading} path="/profile">
              <Profile />
            </ProtectRoute>

            <ProtectRoute loading={isLoading} path="/upload">
              <Upload />
            </ProtectRoute>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/search">
              <Search />
            </Route>

            <Route path="/product">
              <SingleProduct />
            </Route>
            <ProtectRoute loading={isLoading} path="/chat">
              <Chat />
            </ProtectRoute>
            <Route path="/categories">
              <Categories />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </searchCtx.Provider>
    </AppContext.Provider>
  );
}

export default App;
