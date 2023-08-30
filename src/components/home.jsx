// import React from 'react'

import { useContext, useState } from "react";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import Todo from "./Todo";

// import { useContext } from "react";
// import { Context } from "../main";
// import { Navigate } from "react-router-dom";

const Home = () => {
  // const {isAuthenticated} = useContext(Context);
  // if(!isAuthenticated) return <Navigate to={"/login"}/>
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { loading, setloading ,isAuthenticated} = useContext(Context);
  const [tasks, setTasks] = useState([]);
  const [refresh,setRefresh]=useState(false);// This is a amazing tool , Whenver you want the whole data of the page should be refreshed , 
                                              // then you just change the refresh variable and whole data of the page is again fetched using useeffect

  const updateTask = async (id) => {
    if(!isAuthenticated){
      toast.success("Please Login first");
        return ;
    }
    try {
      const res = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      const { data } = res;
      toast.success(data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
    
  };
  const deleteTask = async(id) => {
    if(!isAuthenticated){
      toast.success("Please Login first");
      return ;
    }
    try {
      const res = await axios.delete(
        `${server}/task/${id}`,// don't pass a empty object after this . Because delete request don't accept the body
        {
          withCredentials: true,
        }
      );
      const { data } = res;
      console.log(data);
      toast.success(data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { data } = res;
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success("task successfully added");
        setRefresh(!refresh);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.log(error);
      toast.error("error");
    }

    setloading(false);
  };
  useEffect(() => {
    axios
      .get(`${server}/task/myTasks`, {
        withCredentials: true,
      })
      .then((res) => {
        const { data } = res;
        if (data.success) {
          setTasks(data.ans);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="title"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              type="text"
              required
              placeholder="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <button type="submit" disabled={loading}>
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks.map((task) => {
          return (
            <>
              <Todo
                key={task._id}
                id={task._id}
                updateTask={updateTask}
                deleteTask={deleteTask}
                title={task.title}
                description={task.description}
                isCompleted={task.isCompleted}
              />
            </>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
