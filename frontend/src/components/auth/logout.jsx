import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Update the logged-in state
    setIsLoggedIn(false);

    // Redirect to the home page
    navigate('/');
  }, [navigate, setIsLoggedIn]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;
