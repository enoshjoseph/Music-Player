import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Proceed with the API call directly
    axios
      .post('http://localhost:8081/login', values)
      .then((res) => {
        if (res.data === 'success') {
          navigate('/home');
        } else {
          alert('No record exists');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="r">
      <div className="main">
        <div className="innertext">
          <h1>Sign In</h1>
        </div>

        <div className="innerlogin">
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your Email"
                name="email"
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                name="password"
                onChange={handleInput}
              />
            </div>

            <div className="container">
              <Link to="/signup">Sign Up</Link>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
