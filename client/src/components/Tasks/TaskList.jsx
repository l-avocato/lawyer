// Updated React Component
import React, { useState } from 'react';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css'; // Import the updated CSS file
import SidebarDash from '../SidebarDash/SidebarDash';

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

      setTasks([...tasks, task]);
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
    <div className="lawyers-task-list" style={{ marginTop: 100, marginLeft: 550 }}>
      <div>
        <SidebarDash />
      </div>
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
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={classnames('task-item', { completed: task.done })}
            >
              <div>
                <input
                  className="checkbox-task"
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleToggleDone(task.id)}
                />
                <span className="task-description">{task.description}</span>
              </div>
              <span className="task-deadline">
                {task.deadline && `Deadline: ${task.deadline}`}
              </span>
              <div>
                <button
                  className="delete-task-button"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tasks-message">No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
