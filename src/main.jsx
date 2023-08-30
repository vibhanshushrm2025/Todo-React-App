import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { useState } from 'react';
export const server = "https://backend-crud-r4l1.onrender.com/api/v1";// this can be exported and imported as same as backend we do
// Now sending the required information as a props can be little difficult , so we can use redux state management library for that , also we can
// use context API in small projects as well .
// a state defined in context api can be used in any component in the project . 
// here are the three steps how to use it :

// 1.
import { createContext } from 'react';
// 2. 
export const Context = createContext({isAuthenticated:false});
// 3.
const AppWrapper = ()=>{
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  // below loading will be used for login and signup
  const [loading,setloading] = useState(false);// this variable will become false when we call a await api , and will become true after that
                                               // if this is true , we can set disabled={loading} to disable the buttons
  const [user , setuser] = useState({});
  const [loader,setloader]=useState(false);// this is for first time loading of the website , until we get if the user is authenticated or not
  
  return (
    <Context.Provider value={{ // see there is double {{}}
      isAuthenticated:isAuthenticated,
      setIsAuthenticated:setIsAuthenticated,
      loading,
      setloading,
      user,
      setuser,
      loader,
      setloader
    }}>
      <App />
    </Context.Provider>
  );
  
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <AppWrapper />
  </React.StrictMode>,
)
