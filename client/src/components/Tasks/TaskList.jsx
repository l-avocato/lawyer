import React, { useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import SidebarDash from "../SidebarDash/SidebarDash";
import Swal from "sweetalert2";
import { FIREBASE_AUTH, db } from "../../firebaseconfig";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [lawyer, setLawyer] = useState({});

  const getLawyer = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH.currentUser.email;
      console.log(loggedInLawyer);
      const res = await axios.get(
        `http://localhost:1128/api/lawyer/getLawyerByEmail/${loggedInLawyer}`
      );
      console.log("this is lawyer", res.data);
      setLawyer(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(lawyer);

  const handleAddTask = async () => {
    try {
      await axios.post(
        "http://localhost:1128/api/task/addTask",
        {
          description: newTask,
          deadline: newDeadline,
          lawyerId : lawyer.id
        },
        setRefresh(!refresh)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1128/api/task/allTasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLawyer()
    getTask();
  }, [refresh]);

  const addTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1128/api/task/addTask",
        {}
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleDone = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, done: !task.done };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:1128/api/task/deleteTask/${id}`);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="lawyers-task-list"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      {/* <SidebarDash /> */}

      <h1
        style={{
          height: "100vh",
          color: "white",
          backgroundColor: "black",
          width: "30%",
        }}
      >
        Hello
      </h1>

      {/* <h1  style={{
          height: "15vh",
          color: "white",
          backgroundColor: "black",
          width: "250%",
        }}>goodbye</h1> */}
      <div className="cont">
        <h1
          style={{
            width: "100%",
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            height: "10vh",
            border: "solid 1px red",
          }}
        >
          World
        </h1>
        <h1 className="task-list-title">Task List</h1>
        <div className="task-input-container">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="task-input"
          />
          <DatePicker
            selected={newDeadline}
            onChange={(date) => setNewDeadline(date)}
            placeholderText="Select a deadline"
            className="deadline-input"
          />
          <button className="add-task-button" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
        {tasks.length > 0 ? (
          <div className="task-cards-container">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={classnames("task-card", { completed: task.done })}
              >
                <div className="task-card-header">
                  <input
                    className="checkbox-task"
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleDone(task.id)}
                  />
                  <span className="task-description">{task.description}</span>
                </div>
                <div className="task-card-body">
                  <span className="task-deadline">
                    {task.deadline && `Deadline: ${task.deadline.slice(0, 10)}`}
                  </span>
                  <button
                    className="delete-task-button"
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDeleteTask(task.id);
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                          });
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-tasks-message">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
