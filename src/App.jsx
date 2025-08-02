import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './ui_components/AppLayout'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import ProfilePage from './pages/ProfilePage'
import SignUpPage from './pages/SignUpPage'
import CreatePostPage from './pages/CreatePostPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './ui_components/ProtectedRoute'
import { useEffect, useState } from 'react'
import { getUsername } from './services/apiBlog'
import NotFoundPage from './pages/NotFoundPage'
import AboutPage from './pages/AboutPage'


function App() {

  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("access");

    if (access) {
      setIsAuthenticated(true); // Set auth true manually

      getUsername()   // Manually call API
        .then((res) => {
          if (res?.username) {
            setUsername(res.username);  // Set username from API
          } else {
            setIsAuthenticated(false); // fallback
          }
        })
        .catch(err => {
          console.log("Error getting username on load: ", err);
          setIsAuthenticated(false)
        });
    }
  }, []);


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={
              <AppLayout isAuthenticated={isAuthenticated} username={username} setUsername={setUsername} setIsAuthenticated={setIsAuthenticated} />
            }
          >
            {/* Nested Routes */}
            <Route index element={<HomePage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='profile/:username' element={<ProfilePage authUsername={username} />} />
            <Route path='profile/:username/blogs/:slug' element={<DetailPage />} />
            <Route path='blogs/:slug' element={<DetailPage isAuthenticated={isAuthenticated} username={username} />} />
            <Route path='signup' element={<SignUpPage />} />
            <Route
              path='create_post'
              element={
                <ProtectedRoute>
                  <CreatePostPage isAuthenticated={isAuthenticated} />
                </ProtectedRoute>
              }
            />
            <Route path='signin' element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
            {/* if user visit path that does not exist it will show NotFoundPage */}
            <Route path='*' element={<NotFoundPage />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
