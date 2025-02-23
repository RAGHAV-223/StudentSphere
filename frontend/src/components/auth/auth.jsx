import React, { useState } from 'react';
import './auth.css';
import { useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import toast from 'react-hot-toast';

const Auth = ({ setIsLoggedIn }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ fullname: '', username: '', email: '', password: '', confirmpassword: '' });
  const {loading, signup} = useSignup()

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
      const response = await fetch(`${window.API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        if(response.status === 401)
        toast.error('Invalid username or password');
        throw new Error('Login failed due to unaccepted reasons'); 
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoggedIn(true);
      navigate('/dashboard'); // or your desired route after login
    } catch (error) {
      console.error('Error logging in:', error);
      
      // Handle error display
    }
  };


  const handleSignup = async (event) => {
    event.preventDefault();
    await signup(signupData);
    setIsLoggedIn(true);
    navigate('/dashboard')
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
                id="confirmpassword"
                name="confirmpassword"
                value={signupData.confirmpassword}
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
