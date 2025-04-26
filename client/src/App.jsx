
import { Routes ,Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/pages/HomePage'
import AuthPage from './components/pages/AuthPage'
import ProfilePage from './components/pages/ProfilePage'
import ChatPage from './components/pages/ChatPage'
import { useAuthStore } from './store/useAuthStore'
import React, { useEffect } from 'react'
import { Toaster } from "react-hot-toast"
import { Navigate } from 'react-router-dom';

function App() {

const{checkAuth,authUser,checkingAuth}=useAuthStore();
useEffect(()=>{
  checkAuth();
},[checkAuth])
if(checkingAuth) return <p>loading........</p>



  return (
 
    <div className='absolute inset-0 -z-10 h-full w-full 
    bg-white 
    bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
    bg-[size:6rem_4rem]'>
  <Routes>
<Route path="/" element={authUser?<HomePage/>:<Navigate to={"/auth"}/>}/>
<Route path="/auth" element={!authUser?<AuthPage/>:<Navigate to ={"/"}/>}/>
<Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to={"/auth"}/>}/>
<Route path="/chat/:id" element={authUser?<ChatPage/>:<Navigate to={"/auth"}/>}/>
  </Routes>
  <Toaster/>
</div>
  )
}

export default App
