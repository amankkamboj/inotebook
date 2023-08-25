import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const host = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const submitSignup = async (e) => {
    e.preventDefault();

    const data = {
      name: credential.name,
      email: credential.email,
      password: credential.password,
    };

    const url = `${host}/api/auth/createuser/`;
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
      //Redirect
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <>
      <form className="container mt-5" onSubmit={submitSignup}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            onChange={onChange}
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            onChange={onChange}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
