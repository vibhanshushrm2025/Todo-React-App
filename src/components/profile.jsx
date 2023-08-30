// import React from 'react'

import { useContext } from "react"
import { Context } from "../main"
import Loader from "./loader";

const Profile = () => {
  const {loader,user}=useContext(Context);
  console.log(user);
  console.log(user);
  return (
    
      loader?<Loader />:<div>
        {/* something called "?" is used here  */}
        abcd
        <h1>{user?.name}</h1>
        <span>{user?.email}</span>
      </div>
  )
}

export default Profile
