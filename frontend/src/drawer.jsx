// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHome, HiChatAlt2, HiOutlineBriefcase, HiUserCircle, HiOutlineLogout } from 'react-icons/hi';

const LeftDrawer = () => {

  return (
    <>
      <div className={`fixed rounded-r-box top-35 left-0 w-64 h-auto bg-slate-300 text-white`}>
        <div className="flex flex-col h-full">
          <div className="flex-1 p-4">
            <Link to="/dashboard" className="flex text-[#000] rounded-box items-center  no-underline  py-2 px-4 hover:bg-purple-700 hover:text-[#fff]">
              <HiOutlineHome className="h-6 w-6 mr-2" />
              Home
            </Link>
            <Link to="/forums" className="flex text-[#000] rounded-box items-center  no-underline  py-2 px-4 hover:bg-purple-700 hover:text-[#fff]">
              <HiChatAlt2 className="h-6 w-6 mr-2" />
              Forums
            </Link>
            <Link to="/projectspace" className="flex text-[#000] rounded-box items-center  no-underline  py-2 px-4 hover:bg-purple-700 hover:text-[#fff]">
              <HiOutlineBriefcase className="h-6 w-6 mr-2" />
              Project Space
            </Link>
          </div>
          <div className=" border-purple-700 p-4">
            <Link to="/profile" className="flex text-[#000] rounded-box items-center  no-underline  py-2 px-4 hover:bg-purple-700 hover:text-[#fff]">
              <HiUserCircle className="h-6 w-6 mr-2" />
              Profile
            </Link>
             <Link to="/logout" className='flex text-[#000] rounded-box items-center  no-underline  py-2 px-4 hover:bg-purple-700 hover:text=[#fff]'><HiOutlineLogout className="h-6 w-6 mr-2" />
              Logout
              </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftDrawer;
