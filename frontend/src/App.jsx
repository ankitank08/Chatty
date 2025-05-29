import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/LogInPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import {useAuthStore} from './store/useAuthStore'
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from 'react'
import { Loader } from "lucide-react"
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

export const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
  const { theme } = useThemeStore();

  console.log({onlineUsers});

  useEffect(() => {
    checkAuth()
  },[checkAuth]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  console.log({authUser});

  if(isCheckingAuth && !authUser) 
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='animate-spin' size={40} /> 
      </div>
    );

  return (
    <div>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <SignInPage/> : <Navigate to="/"/>}/>
        <Route path='/settings' element={<SettingPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>
      
      <Toaster />
    </div>
  )
}
export default App