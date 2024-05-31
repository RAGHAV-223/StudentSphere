import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => { 
  const navigate = useNavigate();

 useEffect( async () =>{
  try{
    const response = await fetch('http://localhost:8000/api/auth/logout',{
      method:"POST",
      headers:{
        'Content-Type': "application/json",
      },
      credentials: 'include', 

    });
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  } catch(error){
    console.error("hello error", error)
  }
  navigate('/');
 }, [navigate, setIsLoggedIn]);
  return (
    <div>
      Logging out/
    </div>
  );
};

export default Logout;
