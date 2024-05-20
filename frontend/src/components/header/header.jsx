import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css"

const Header = ({ isLoggedIn }) => {
  return (
    <header className="header_section bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <nav className="navbar navbar-expand-lg flex justify-between items-center custom_nav-container">
          <Link className="navbar-brand flex items-center" to={isLoggedIn ? '/dashboard' : '/'}>
            <div className="avatar">
              <div className="w-10 rounded-full hover:ring ring-purple-800 ring-offset-base-100 ring-offset-2">
                <img src="/logo.png" alt="Logo" />
              </div>
            </div>
            <span className="ml-2 text-xl font-bold">StudentSphere</span>
          </Link>
          <button
            className="navbar-toggler btn btn-square btn-ghost lg:hidden"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="s-1 block w-6 h-0.5 bg-gray-600 mb-1"></span>
            <span className="s-2 block w-6 h-0.5 bg-gray-600 mb-1"></span>
            <span className="s-3 block w-6 h-0.5 bg-gray-600"></span>
          </button>
          <div className="collapse navbar-collapse lg:flex lg:items-end lg:space-x-4" id="navbarSupportedContent">
            <ul className="navbar-nav flex flex-col lg:flex-row items-center lg:space-x-4">
              <li className="nav-item ">
                <Link className="nav-link text-gray-700 hover:text-blue-500" to={isLoggedIn ? '/dashboard' : '/'}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-gray-700 hover:text-blue-500" to={isLoggedIn ? '/threads' : '/login'}>
                  Discussion Forums
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-gray-700 hover:text-blue-500" to={isLoggedIn ? '/projects' : '/login'}>
                  Project Space
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-gray-700 hover:text-blue-500" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-gray-700 hover:text-blue-500" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
          {isLoggedIn ? (<div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar">
              <div className="w-10 rounded-full hover:ring ring-purple-800 ring-offset-2"> {/* profile icon and logo */} 
                <img alt="profile" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="badge badge-outline bg-[#f7ff5b]"><p className='text-[#000]'>Gold</p></div>
            <ul tabIndex={0} className="mt-1 z-[1] p-1 menu menu-sm dropdown-content bg-base-100 rounded-box w-32">
              <li>
                <Link  className=" text-[#000] hover:bg-[#5625a1] rounded-box hover:text-[#FFF] no-underline" to="/:id/profile">Profile</Link>
              </li>
              <li>
                <Link className="link text-[#000] hover:bg-[#5625a1] rounded-box hover:text-[#FFF] no-underline" to="/:id/setting">Setting</Link>
              </li>
              <li>
                <Link className="text-[#000] hover:bg-[#5625a1] rounded-box hover:text-[#FFF] no-underline" to="/logout">Logout</Link>
              </li>
            </ul>
          </div>) : ("")}
        </nav>
      </div>
    </header>
  );
};

export default Header;
