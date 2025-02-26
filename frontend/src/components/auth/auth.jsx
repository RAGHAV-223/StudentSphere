import React, { useState } from 'react';
import './auth.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../context/authcontext";
import toast from 'react-hot-toast';

const Auth = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ fullname: '', username: '', email: '', password: '', confirmpassword: '' });
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

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
    setLoading(true);

    if (!loginData.username || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }
  
    try {
			const res = await fetch(`${window.API_BASE_URL}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(loginData),
				
			});
			if(!res.ok){
				if (res.status === 401){
					throw ({message:'Invalid username', status: res.status, statustext:res.statusText});
				}else if (res.status === 405) {
          throw ({message:"Invalid Password: password don't match", status: res.status,statustext:res.statusText});
				}else{
          throw ({message:'Login failed due to unaccepted reasons', status: res.status, statustext:res.statusText}); 
				}
			}
      const data = await res.json();
			if (data.error) {
				throw ({message: "Server error",status:data.error.status, statusText});
			}
			localStorage.setItem("user", JSON.stringify(data));
      setIsLoggedIn(true);
      setAuthUser(data);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
      console.error('Error logging in:', error.status, error.statustext);
    } finally {
			setLoading(false);
		}
  };


  const handleSignup = async (event) => {
    try{
      event.preventDefault();
      setLoading(true);
      if (!signupData.fullname || !signupData.username || !signupData.password || !signupData.confirmpassword || !signupData.email) {
        toast.error("Please fill in all fields");
        return;
      }
    
      if (signupData.password !== signupData.confirmpassword) {
        throw ({message:'Password do not match', status: 404, statustext:'Passwords do not match'});
      }
    
      if (signupData.password.length < 6) {
        throw ({message:'Password must be at least 6 characters', status: 404, statustext:'Password must be at least 6 characters'});
      }
      const res = await fetch(`${window.API_BASE_URL}/api/auth/sign-up`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(signupData),
			});
			if (!res.ok) {
				if (res.status === 402) {
				  throw ({message:'Username already exists', status: res.status, statustext: res.statustext})
				}else if (res.status === 403) {
          throw ({message:'Email already Registered', status: res.status, statustext: res.statustext})
				} else if(res.status === 404){
					throw ({message:'Invalid User data, User not created', status: res.status, statustext: res.statustext})
				} else {
				  throw ({message:'Signup failed due to unaccepted reasons', status: res.status, statustext: res.statustext})
				}
      }
      const data = await res.json();
      if (data.error) {
        throw ({message: "Server error",status:data.error.status, statusText});
      }
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      setIsLoggedIn(true);
      navigate('/dashboard')
    }catch(error){
      console.error('Error in Signup: ', error.status, error.statustext);
      toast.error(error.message);
    } finally {
			setLoading(false);
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
            <button type="submit" className="btn border flex items-center justify-center hover:bg-[#6841a2]" disabled={loading}>
              {loading ? (<div className="w-7 h-7 border-4 border-t-transparent border-[#6841a2] rounded-full animate-spin mx-auto"></div>) : 'SIGN IN'}
            </button>
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
            <button type="submit" className="btn solid flex items-center justify-center" disabled={loading}>
              {loading ? (<div className="w-5 h-5 border-4 border-t-transparent border-[#6841a2] rounded-full animate-spin mx-auto"></div>) : 'Sign Up'}
            </button>
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
              <button className="btn transparent" id="sign-up-btn" onClick={toggleForm}>
                Sign In</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
