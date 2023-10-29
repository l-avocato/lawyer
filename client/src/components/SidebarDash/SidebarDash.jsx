import React, { useState } from 'react';
import './style.css';
// import clients from  
const SidebarDash = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div className="sidebar-container">
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
          border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Avocato
          </h1>
        </div>
        <ul className="pt-6">
          <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 bg-light-white`}>
            <img src="./src/assets/Chart_fill.png" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Dashboard
            </span>
          </li>
          <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9`}>
            <img src="./src/assets/Chat.png" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Inbox
            </span>
          </li>
          {/* Add more li elements for other menu items with respective routes */}
          <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-9`}>
            <img src="./src/assets/User.png" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Accounts
            </span>
          </li>
          
        </ul>
      </div>
    </div>
  );
};


export default SidebarDash;
