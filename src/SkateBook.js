import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Route, Redirect } from "react-router-dom"
import './App.css';

export const SkateBook = () => {
  return (
    <>
    <Route
      render={() => {
        if (sessionStorage.getItem("headspace_user")) {
          return (
            <>
              {/* <NavBar />
              <ApplicationViews /> */}
            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
  );
}

