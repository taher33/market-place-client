import React, { useState } from "react";
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

const socket = io("http://localhost:8080/");

function App(): JSX.Element {
  const [user, setUser] = useState({} as any);
  return (
    <AppContext.Provider value={{ user, setUser, socket }}>
      <div>
        <Navbar />

        <Scrolltotop />
        <Switch>
          <ProtectRoute path="/" exact>
            <Landing />
          </ProtectRoute>
          <ProtectRoute path="/profile">
            <Profile />
          </ProtectRoute>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/product">
            <SingleProduct />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
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
