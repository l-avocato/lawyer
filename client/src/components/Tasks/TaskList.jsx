import React, { useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import SidebarDash from "../SidebarDash/SidebarDash";
import Swal from "sweetalert2";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { FIREBASE_AUTH } from "../../firebaseconfig";


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [lawyer,setLawyer]=useState({});
  
  const getLawyer = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH?.currentUser?.email;
      console.log(loggedInLawyer);
      const res = await axios.get(`http://localhost:1128/api/lawyer/getLawyerByEmail/${loggedInLawyer}`);
      setLawyer(res.data);
    } catch(err) {
      console.log(err);
    }
  };

  const handleAddTask = async () => {
    try {
      await axios.post(
        "http://localhost:1128/api/task/addTask",
        {
          description: newTask,
          deadline: newDeadline,
          lawyerId: lawyer.id
        },
        setRefresh(!refresh),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getTask = async () => {
    try {

      const response = await axios.get(
        `http://localhost:1128/api/task/allTasks/lawyerId/${lawyer.id}`,
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLawyer()

  }, []);

  useEffect(() => {
    getTask();

  }, [lawyer,refresh]);
  
  




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

<div style={{display:'flex'}}>
  <SidebarDash/>
<div
      className="lawyers-task-list"
      style={{ display: "flex", flexDirection:'column',width:'100%'  }}>

     <NavbarDashboard/>

      
      <div className="cont">
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
                className={classnames("task-card", { completed: task.done })}>
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
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDeleteTask(task.id)
                          Swal.fire({
                            title: "Deleted!",
                            icon: "success"
                          });
                        }
                      });
                    }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-tasks-message">No tasks found.</p>
        )}
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=" crossorigin="anonymous" />


      <div class="card-header">
        <h4>Task Details</h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <tbody><tr>
              <th class="text-center">
                <div class="custom-checkbox custom-checkbox-table custom-control">
                  <input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad" class="custom-control-input" id="checkbox-all"/>
                  <label for="checkbox-all" class="custom-control-label">&nbsp;</label>
                </div>
              </th>
              <th>Task Name</th>
              <th>Progress</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
            <tr>
              <td class="p-0 text-center">
                <div class="custom-checkbox custom-control">
                  <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-1"/>
                  <label for="checkbox-1" class="custom-control-label">&nbsp;</label>
                </div>
              </td>
              <td>Ecommerce website</td>
              <td class="align-middle">
                <div class="progress" data-height="4" data-toggle="tooltip" title="" data-original-title="100%" style={{height: '4px'}}>
                  <div class="progress-bar bg-success" data-width="100" style={{width: "100px"}}></div>
                </div>
              </td>
              <td>2018-01-20</td>
              <td>
                <a class="btn btn-primary btn-action mr-1" data-toggle="tooltip" title="" data-original-title="Edit"><i class="fas fa-pencil-alt"></i></a>
                <a class="btn btn-danger btn-action" data-toggle="tooltip" title="" data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" data-confirm-yes="alert('Deleted')" data-original-title="Delete"><i class="fas fa-trash"></i></a>
              </td>
            </tr>
            <tr>
              <td class="p-0 text-center">
                <div class="custom-checkbox custom-control">
                  <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-4"/>
                  <label for="checkbox-4" class="custom-control-label">&nbsp;</label>
                </div>
              </td>
              <td>Android App</td>
              <td class="align-middle">
                <div class="progress" data-height="4" data-toggle="tooltip" title="" data-original-title="30%" style={{height: '4px'}}>
                  <div class="progress-bar bg-orange" data-width="30" style={{width: '30px'}}></div>
                </div>
              </td>
              <td>2018-09-11</td>
              <td>
                <a class="btn btn-primary btn-action mr-1" data-toggle="tooltip" title="" data-original-title="Edit"><i class="fas fa-pencil-alt"></i></a>
                <a class="btn btn-danger btn-action" data-toggle="tooltip" title="" data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" data-confirm-yes="alert('Deleted')" data-original-title="Delete"><i class="fas fa-trash"></i></a>
              </td>
            </tr>
            <tr>
              <td class="p-0 text-center">
                <div class="custom-checkbox custom-control">
                  <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-5"/>
                  <label for="checkbox-5" class="custom-control-label">&nbsp;</label>
                </div>
              </td>
              <td>Logo Design</td>
              <td class="align-middle">
                <div class="progress" data-height="4" data-toggle="tooltip" title="" data-original-title="67%" style={{height: '4px'}}>
                  <div class="progress-bar bg-purple" data-width="67" style={{width: '67px'}}></div>
                </div>
              </td>
              <td>2018-04-12</td>
              <td>
                <a class="btn btn-primary btn-action mr-1" data-toggle="tooltip" title="" data-original-title="Edit"><i class="fas fa-pencil-alt"></i></a>
                <a class="btn btn-danger btn-action" data-toggle="tooltip" title="" data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" data-confirm-yes="alert('Deleted')" data-original-title="Delete"><i class="fas fa-trash"></i></a>
              </td>
            </tr>
            <tr>
              <td class="p-0 text-center">
                <div class="custom-checkbox custom-control">
                  <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-6"/>
                  <label for="checkbox-6" class="custom-control-label">&nbsp;</label>
                </div>
              </td>
             
            
            </tr>
          </tbody></table>
    </div>
</div> */}
      </div>
    </div>
  
</div>

   
  );
};

export default TaskList;
