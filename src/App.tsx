import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Landing from "./pages/Main";
import Signup from "./pages/Signup";
import SingleProduct from "./pages/SingleProduct";

function App(): JSX.Element {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/product">
          <SingleProduct />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
