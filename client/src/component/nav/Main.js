import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { NavLink } from "react-router-dom";
import { removeFromLocalStorage } from "../../helper/auth";

export default function Main() {
  const [auth, setAuth] = useContext(AuthContext);

  const logout = () => {
    setAuth(null);
    removeFromLocalStorage();
  };
  return (
    <ul className="nav shadow mb-2 d-flex justify-content-center ">
      <li className="nav-item">
        <NavLink className="nav-link" to="/home">
          Home
        </NavLink>
      </li>
      {auth !== null && auth !== undefined ? (
        <>
          <li className="nav-item d-flex align-items-center dropdown">
            <a
              className="nav-item dropdown-toggle text-decoration-none"
              data-bs-toggle="dropdown"
            >
              {auth?.user?.name}
            </a>
            <ul className="dropdown-menu">
              <li>
                <NavLink className="nav-link dropdown-item " to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link dropdown-item "
                  to="/login"
                  onClick={logout}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}
