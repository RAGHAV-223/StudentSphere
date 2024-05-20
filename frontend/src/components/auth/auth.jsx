import React, { useState } from 'react';
import './auth.css';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setIsLoggedIn }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ fullname: '', username: '', email: '', password: '', cpassword: '' });

  const navigate = useNavigate();
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      navigate('/dashboard'); // or your desired route after login
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error display
    }
  };


  const handleSignup = async (event) => {
    event.preventDefault();
    if (signupData.password !== signupData.cpassword) {
      console.error('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          fullname: signupData.fullname,
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
          confirmpassword: signupData.cpassword
        }),
      });
  
      if (!response.ok) 
      { const errorData = await response.json();
        console.log(errorData); 
        if (response.status === 409) {
          throw new Error(errorData.message);
        } else if (response.status === 500) {
          throw new Error(errorData.message);
        } else {
          throw new Error(errorData.message);
        }
        // Handle the error appropriately
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      navigate('/dashboard'); // or your desired route after login
    } catch (error) {
      console.error('Error Signup in:', error.message);
      // Handle error display
    }
  };
  

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className={`auth-container ${isSignIn ? '' : 'sign-up-mode'}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="/login" method="post" className="sign-in-form" onSubmit={handleLogin}>
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                id="Username"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
          <form action="/login" method="post" className="sign-up-form" onSubmit={handleSignup}>
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Fullname"
                id="Fullname"
                name="fullname"
                value={signupData.fullname}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                id="Username"
                name="username"
                value={signupData.username}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                id="cpassword"
                name="cpassword"
                value={signupData.cpassword}
                onChange={handleSignupChange}
                required
              />
            </div>
            <input type="submit" value="Sign Up" className="btn solid" />
          </form>
        </div>
      </div>
      <div className="form-panels-container">
        <div className={`form-panel ${isSignIn ? 'right-panel' : 'left-panel'}`}>
          <div className="content">
            <h3>{isSignIn ? "New here?" : "One of us?"}</h3>
            <p>{isSignIn ? "Create your Account." : "Already have an Account"}</p>
            {isSignIn ? (
              <button className="btn transparent" id="sign-up-btn" onClick={toggleForm}>
                Sign Up</button>
            ) : (
              <button className="btn transparent" id="sign-in-btn" onClick={toggleForm}>
                Sign In</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
