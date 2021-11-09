import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import ProtectRoute from "./components/protectdrout";
import Scrolltotop from "./components/scrolltotop";
import Categories from "./pages/categories";
import Chat from "./pages/Chat";
import Landing from "./pages/Main";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import SingleProduct from "./pages/SingleProduct";

function App(): JSX.Element {
  return (
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
      </Switch>
    </div>
  );
}

export default App;
