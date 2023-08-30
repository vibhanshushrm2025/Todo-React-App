import './styles/app.scss'
// import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
// import { useState,useEffect } from 'react';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Login from './components/login';
import Home from './components/home';
import Profile from './components/profile';
import Register from './components/register';
import './styles/app.scss'
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { Context, server } from './main';
import axios from 'axios';
function App() {
  const {setIsAuthenticated , setuser,setloader} = useContext(Context);
  // whenever we refresh the page , the isauthenticated variable turn again to default value ,
  // to avoid that , whenever we refresh , we check for get_my_profile route , if it returns false , then we set isauthenticated false else true
// this useeffect ( without the second argument ) will be called whenever we reload the site
useEffect(()=>{
  setloader(true);
  axios.get(`${server}/users/me`,{
    withCredentials:true
  }).then((res)=>{
    const {data}=res;
    if(!data.success){
      setIsAuthenticated(false);
      setuser({});
    }
    else{
      setIsAuthenticated(true);
      setuser(data.user);
    }
    setloader(false);
  }).catch((error)=>{
    console.log(error);
    setloader(false);
  })
},[])
  
  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/Profile" element={<Profile/>} />
          <Route exact path="/Register" element={<Register/>} />
          <Route path="/" element={<Home/>} />
    </Routes>
    
    
    <Footer />
  </Router>
  <Toaster />
    
    </>
  )
}

export default App
