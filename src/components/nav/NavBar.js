import React from "react"
import { Link, useHistory } from "react-router-dom"
import "../nav/NavBar.css"

export const NavBar = (props) => {
  const history = useHistory();

    const handleLogout = () => {
        sessionStorage.clear();
        history.push("/login")
    }
  return (
    <nav className="navContainer">

      <ul className="navbar">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/trickList">Trick List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/myProfile">My Profile</Link>
        </li>
        <li className="nav-item">
          <button type="button" className="btn btn-primary" onClick={handleLogout}> Logout </button>
        </li>
      </ul>
    </nav>
  )
}