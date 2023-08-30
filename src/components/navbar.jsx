import  { useContext } from 'react'
import {
    // BrowserRouter as Router,
    // Routes,
    // Route,
    Link
  
  } from "react-router-dom";
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const Navbar = () => {
  const data = useContext(Context); // all the variables are accessed using this 
  const {setIsAuthenticated,loading , setloading} = useContext(Context);
  const logoutHandler = async()=>{
    // one thing to notice in the below try catch block is that , when you get 404 request from the api , it treat it as a error and move to the 
    // catch part , althrough if the status code 404 is sent intentionally . 
    // So , I changed all the 404 response from  the api into the 201 status code 
    try {
        //through axios , 1st argument ---> link , 2nd argument ---> body json , 3rd argument--->always same as below
        setloading(true);
        const usr = await axios.get(`${server}/users/logout`,
        {
            withCredentials:true
        });
        const {data}=usr;
        const {message}=data;
        {
          data.success?setIsAuthenticated(false):setIsAuthenticated(true);
        }
        {
          data.success?toast.success(message):toast.error(message);
        }
        setloading(false);
    } catch (error) {
        toast.error("error");
        setloading(false);
    }
    // you can't use return statement here , why i don't know
     
    
    
    
  }
  return (
    <nav className='header'>
    <div>
        <h2>Todo App.</h2>
      </div>
      <article>
      <Link to="/">Home</Link>
      {
        data.isAuthenticated?<button onClick={logoutHandler} className='btn' disabled={loading}>LogOut</button>:<Link to="/login">Login</Link>
      }
      <Link to="/profile">Profile</Link>
      <Link to="/register">Register</Link>
      </article>
    </nav>
  )
}

export default Navbar
