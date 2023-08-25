import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const host = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  

  const submitLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: credential.email,
      password: credential.password,
    };
    const url = `${host}/api/auth/login/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    console.log(json);
    if (json.success) {
      console.log("in success");
      //Store token
      localStorage.setItem("token", json.token);
      // Show alert
      Swal.fire({
        title: "Login successful!",
        text: "You will be redirected to the dashboard.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      //Redirect
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form className="container mt-5" onSubmit={submitLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={credential.email}
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={credential.password}
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
