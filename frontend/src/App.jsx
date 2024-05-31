import { React, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import Auth from './components/auth/auth';
import Dashboard from './components/dashboard/dashboard';
import AboutPage from './components/about/about';
import ContactPage from './components/contact/contact';
import ThreadDetailPage from './components/threads/threads';
import Logout from './components/auth/logout';
import ProjectSpace from './components/projectspace/projectSpace';
import LeftDrawer from './drawer';
import Profile from "./components/profile/profile"
import {Toaster} from "react-hot-toast"
import { AuthContextProvider, useAuthContext } from './components/context/authcontext';

const App = () => {
  const location = useLocation();
  const loginpage = location.pathname === '/login';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState('Select a badge')
  const {authUser}= useAuthContext();

  return (
    <>
    <div className='flex flex-col min-h-screen'>
      {!loginpage && <Header selectedBadge={selectedBadge} isLoggedIn={isLoggedIn} />}
      <div className='flex flex-1'>
        {isLoggedIn ? <LeftDrawer /> : ""}
      <main className="flex-grow p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={<Profile selectedBadge={selectedBadge} setSelectedBadge={setSelectedBadge} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/forums" element={<ThreadDetailPage />} />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/projects" element={<ProjectSpace />} />
        
        
        {/* <Route path="/contactUs" element={isLoggedIn ? <Dashboard /> : <Home />} /> */}
        {/* <Route path="/about" element={isLoggedIn ? <Dashboard /> : <Home />} /> */}
        <Route path="*" component={() => <h1>404 Not Found</h1>} />
      </Routes>
      <Toaster/>
      </main>
      </div>
      {!loginpage && <Footer />}
      </div>
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  </BrowserRouter>
);

export default AppWrapper;

