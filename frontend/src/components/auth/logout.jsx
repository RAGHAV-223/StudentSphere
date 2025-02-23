import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await fetch(`${window.API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          toast("An error occurred while logging out!");
          throw new Error("Failed to logout");
        }
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        toast("User logged out successfully");
        // Redirect to the home page
        navigate('/');
      } catch (error) {
        console.error("Error in logout: ", error);
      }
    };

    logoutUser();
  }, [navigate, setIsLoggedIn]);

  return (
    <div>
      Logging out.....
    </div>
  );
};

export default Logout;
