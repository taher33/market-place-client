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
import { AppContext } from "./utils/context";
import io from "socket.io-client";
import { useQuery } from "react-query";
import { axios_instance } from "./utils/axios";
import { Response } from "./utils/types";
import Upload from "./pages/Upload";

const socket =
  process.env.NODE_ENV === "development"
    ? io("http://localhost:8080/")
    : io(process.env.REACT_APP_CHAT_ENDPOINT_PROD!);

function App(): JSX.Element {
  const [user, setUser] = useState({} as any);
  useQuery(
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
        socket.emit("connect to server", payload, (res: Response) => {
          if (res.status === "error") return console.log(res.data);
        });
      },
      onError: () => null,
    }
  );
  return (
    <AppContext.Provider value={{ user, setUser, socket }}>
      <div>
        <Navbar />

        <Scrolltotop />
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <ProtectRoute path="/profile">
            <Profile />
          </ProtectRoute>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/product">
            <SingleProduct />
          </Route>
          <ProtectRoute path="/chat">
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
    </AppContext.Provider>
  );
}

export default App;
