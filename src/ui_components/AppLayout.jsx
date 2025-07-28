import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { ToastContainer, toast } from 'react-toastify';


const AppLayout = ({ isAuthenticated, username, setIsAuthenticated, setUsername }) => {
  
  // to save the theme if light then after refresh must remain light else dark
  useEffect(function(){
    // if in localstorage there is no such thing called dark, then set dark false
    if(localStorage.getItem("dark") === null) { 
      // if there is no item in local storage called dark, then create it and set it's value false.
      localStorage.setItem('dark', 'false')
    }
  },[])


  const [darkMode, setdarkMode] = useState(localStorage.getItem("dark") === 'true')
  // localStorage.getItem("dark") === 'true' --> if this condition is true then dark mode is on, if not then dark mode is off

  const handleDarkMode = () => {
    const newDarkMode = !darkMode
    setdarkMode(newDarkMode)
    localStorage.setItem("dark", newDarkMode ? "true" : "false")
  }


  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="w-full bg-white dark:bg-[#090a12]">
        <Navbar 
        darkMode={darkMode} 
        handleDarkMode={handleDarkMode} 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        username={username} 
        setUsername={setUsername}
        />
          <ToastContainer />
          <Outlet />
          <Footer />
      </main>
    </div>
  )
}

export default AppLayout