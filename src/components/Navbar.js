import React, { useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {}, [location]);

  const handelLogout = () => {
    localStorage.removeItem("token","");
    Swal.fire({
      title: "Logout successful!",
      text: "You will be Logedout.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
    navigate("/login")
  }

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          InoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          
            {!localStorage.getItem("token")?
            <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary mx-2" to="/signup">
              Signup
            </Link> </form>: <button onClick={handelLogout} className="btn btn-danger">Logout</button>}          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
