import React, { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { AiOutlineMenu } from "react-icons/ai";
import ResponsiveNav from './ResponsiveNav';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ShowProfileAvatar from './ShowProfileAvatar';


const Navbar = ({ darkMode, handleDarkMode, isAuthenticated, username, setIsAuthenticated, setUsername }) => {

  const [showNavbar, setshowNavbar] = useState(false);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    setUsername(null);
    navigate("/");
  }

  
  return (
    <>
      <nav className='w-full px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10 bg-[#FFFFFF] dark:bg-[#090a12]'>
        <Link to="/" className="font-semibold tracking-wider text-[#141624] text-3xl flex mr-12 dark:text-[#FFFFFF]">
          InkSpire
        </Link>

        <ul className='flex items-center justify-center gap-14 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-[#FFFFFF]'>

          {isAuthenticated ? (
            <>
              <li>
                Hi, {username}
              </li>
              <li onClick={logout} className="cursor-pointer hover:text-black dark:hover:text-white">
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}



          <li className='font-semibold'>
            <NavLink to="/create_post" className={({ isActive }) => `transition-colors duration-200 ${isActive ? "bg-blue-950 text-white py-1 px-3 rounded" : ""}`}>
              Create Post
            </NavLink>
          </li>
        </ul>

        <div className='flex items-center gap-8'>
          <Switch onCheckedChange={handleDarkMode} checked={darkMode} className="cursor-pointer" />
          {isAuthenticated && <NavLink to={`/profile/${username}`}>
            <ShowProfileAvatar username={username} />
          </NavLink>}

          <AiOutlineMenu
            className="text-2xl cursor-pointer hidden max-md:block dark:text-white"
            onClick={() => setshowNavbar((curr) => !curr)} // toggling the current state and negating if true then false & vice-versa.
          />

        </div>

      </nav>
      {showNavbar && <ResponsiveNav isAuthenticated={isAuthenticated} username={username} logout={logout} />}
      {/* In React, this is conditional rendering, when you write an expression inside {}, React evaluates that expression. If the expression evaluates to true, the corresponding element gets rendered. If the expression evaluates to false, the element will not be rendered. */}
    </>
  )
}

export default Navbar