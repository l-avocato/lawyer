import React, { useState } from 'react';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import SidebarDash from '../SidebarDash/SidebarDash';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';
import { height } from '@mui/system';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDeadline, setNewDeadline] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim() !== '' && newDeadline) {
      const task = {
        id: Date.now(),
        description: newTask,
        deadline: newDeadline.toLocaleDateString(),
        done: false,
      };

      setTasks([task, ...tasks]); // Add new task to the beginning of the array
      setNewTask('');
      setNewDeadline(null);
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

  const handleDeleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <div style={{display:"flex"}}>
      <SidebarDash/>
    <div className="lawyers-task-list">
      <NavbarDashboard/>
      <div style={{width:'68%', padding:"2rem", alignSelf:'center' }}>
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
      </div>
     
      {tasks.length > 0 ? (
        <div className="task-cards-container">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={classnames('task-card', { completed: task.done })}
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
                  {task.deadline && `Deadline: ${task.deadline}`}
                </span>
                <button
                  className="delete-task-button"
                  onClick={() => handleDeleteTask(task.id)}
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