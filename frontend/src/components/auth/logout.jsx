import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authcontext';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await fetch(`${window.API_BASE_URL}/api/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        if (!res.ok) {
          throw (res.status);
        }
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setAuthUser(null);
        navigate('/');
        toast.success("User logged out successfully");
      } catch (error) {
        toast.error("An error occurred while logging out!");
        console.error("Error in logout: ", error);
      }
    };
    
    logoutUser();
  }, []);

  return (
    <div>
      Logging out.....
    </div>
  );
};

export default Logout;
