import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HiOutlineBell, HiOutlineChartBar, HiOutlineDocumentText, HiOutlineUserGroup, HiExclamationCircle } from 'react-icons/hi';

// Mock function to simulate backend call
const fetchUserData = async () => {
  try {
    const response = await axios.get('/api/user'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      if (userData) {
        setUser(userData);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Optionally, add a loading spinner or message
  }

  const isProfileComplete = user.name && user.email && user.university && user.badge;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Welcome, {user.name}!</h1>
          <button className="btn btn-primary">Settings</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Complete Profile Action */}
          {!isProfileComplete && (
            <div className="bg-red-100 p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-red-600">
                <HiExclamationCircle className="mr-2" /> Complete Your Profile
              </h2>
              <p className="mb-4">Some profile details are missing. Please complete your profile to access all features.</p>
              <Link to="/profile" className="btn btn-primary">Complete Profile</Link>
            </div>
          )}

          {/* Notifications */}
          <div className={`bg-white p-4 rounded-lg shadow-md ${!isProfileComplete ? 'col-span-1' : 'col-span-1 md:col-span-1 lg:col-span-1'}`}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center"><HiOutlineBell className="mr-2" /> Notifications</h2>
            <ul>
              <li className="mb-2">You have 3 new messages</li>
              <li className="mb-2">Assignment due tomorrow</li>
              <li>Profile updated successfully</li>
            </ul>
          </div>

          {/* Recent Activities */}
          <div className={`bg-white p-4 rounded-lg shadow-md ${!isProfileComplete ? 'col-span-1' : 'col-span-1 md:col-span-1 lg:col-span-1'}`}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center"><HiOutlineDocumentText className="mr-2" /> Recent Activities</h2>
            <ul>
              <li className="mb-2">Joined "Machine Learning" forum</li>
              <li className="mb-2">Submitted project "AI Research"</li>
              <li>Commented on a post in "Data Science"</li>
            </ul>
          </div>

          {/* New Dashboard Box */}
          <div className={`bg-white p-4 rounded-lg shadow-md ${!isProfileComplete ? 'col-span-1' : 'col-span-1 md:col-span-1 lg:col-span-1'}`}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center"><HiOutlineUserGroup className="mr-2" /> Team Updates</h2>
            <ul>
              <li className="mb-2">New member joined your project team</li>
              <li className="mb-2">Team meeting scheduled for Friday</li>
              <li>Project milestone achieved</li>
            </ul>
          </div>

          {/* Statistics/Graphs */}
          <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-semibold mb-4 flex items-center"><HiOutlineChartBar className="mr-2" /> Statistics</h2>
            {/* Placeholder for charts - you can replace this with actual chart components */}
            <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Chart or Graph Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
