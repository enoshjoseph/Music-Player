import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Proceed with the API call directly
    axios
      .post("http://localhost:8081/signup", values)
      .then((res) => {
        navigate("/"); // Navigate to login page on success
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main2">
      <div className="cont">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb1">
            <label htmlFor="name" className="form-label">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              name="name"
              value={values.name}
              onChange={handleInput}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb1">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb1">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              name="password"
              value={values.password}
              onChange={handleInput}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign Up
          </button>
          <Link
            to="/"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none mt-2"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
