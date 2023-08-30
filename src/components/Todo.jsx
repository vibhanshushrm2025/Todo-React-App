// import React from 'react'

// import { useState } from "react";

const Todo = (prop) => {
    const {title,description,isCompleted,updateTask,deleteTask,id}=prop;
    // const []=useState()
  return (
    <div className='todo' >
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div>
            <input type="checkbox" onChange={()=>updateTask(id)} checked={isCompleted} />
            <button className="btn" onClick={()=>deleteTask(id)}>Delete</button>
        </div>
    </div>
  )
}

export default Todo
