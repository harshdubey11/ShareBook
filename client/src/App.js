import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Logout from "./components/Logout/Logout";


import SearchResults from "./components/SearchResults/SearchResults";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        {user ? <Home /> : <Login />}
      </Route>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/register">
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route path="/profile/:username">
        <Profile />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/search">
      <SearchResults />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
