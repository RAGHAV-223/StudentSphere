import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUserCircle, HiPencilAlt, HiChat, HiFolder } from 'react-icons/hi';
import axios from 'axios'; // Add axios for making HTTP requests

const fetchUserData = async () => {
  try {
    const response = await axios.get('/api/user/'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put('/api/user', userData); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    return null;
  }
};

const ProfilePage = ({ selectedBadge, setSelectedBadge }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      if (userData) {
        setUser(userData);
        setSelectedBadge(userData.badge);
        setFormData({
          name: userData.name,
          email: userData.email,
          university: userData.university,
        });
      }
    };

    fetchData();
  }, [setSelectedBadge]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBadgeChange = (event) => {
    setSelectedBadge(event.target.value);
  };

  const handleSaveChanges = async () => {
    const updatedUserData = {
      ...formData,
      badge: selectedBadge,
    };

    const updatedUser = await updateUserProfile(updatedUserData);
    if (updatedUser) {
      setUser(updatedUser);
      setIsEditing(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Optionally, add a loading spinner or message
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500 hover:text-blue-700"
          >
            <HiPencilAlt className="h-6 w-6 inline" /> Edit Profile
          </button>
        </div>
        <div className="flex items-center mt-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <HiOutlineUserCircle className="h-12 w-12 text-gray-500" />
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.university}</p>
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="badge-select" className="text-gray-800 font-semibold">Select Badge: </label>
          <select
            id="badge-select"
            value={selectedBadge}
            onChange={handleBadgeChange}
            className="ml-2 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select a badge</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
          {selectedBadge && (
            <p className="mt-2 text-gray-600">Selected Badge: <span className="font-semibold">{selectedBadge}</span></p>
          )}
        </div>
        {isEditing && (
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold" htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold" htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold" htmlFor="university">University:</label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/my-forums" className="bg-blue-500 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600">
              <HiChat className="h-6 w-6 mr-2" /> My Forums
            </Link>
            <Link to="/my-projects" className="bg-green-500 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-green-600">
              <HiFolder className="h-6 w-6 mr-2" /> My Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;