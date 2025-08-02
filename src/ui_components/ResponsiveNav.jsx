import {useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom';
import ShowProfileAvatar from './ShowProfileAvatar';
import { Switch } from '@/components/ui/switch';


const ResponsiveNav = ({ isAuthenticated, username, logout, handleDarkMode, darkMode }) => {

    return (
        <>
            <nav className='max-container px-12 py-6 hidden max-md:block dark:text-white'>
                {/* well the responsive-nav ul is hidden at starting but reaching at max-md point it become block ele and the Navbar ul become hidden */}
                <ul className='flex items-center justify-center gap-9 text-[#3B3C4A] lg:flex-1 flex-col dark:text-[#FFFFFF]'>

                    {isAuthenticated ? (
                        <>
                            <li>
                                Hi, {username}
                            </li>
                            <li onClick={logout} className="cursor-pointer">
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
<div className='flex items-center justify-end gap-6 py-2'>
          <Switch onCheckedChange={handleDarkMode} checked={darkMode} className="cursor-pointer" />
          {isAuthenticated && <NavLink to={`/profile/${username}`}>
            <ShowProfileAvatar username={username} />
          </NavLink>}
        </div>

            </nav>
        </>
    )
}

export default ResponsiveNav