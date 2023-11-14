import React, { useState, useRef, useEffect } from "react";
import "./chat.css";
import SidebarDash from "../SidebarDash/SidebarDash";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const sender = "John Doe"; // Change the sender as needed
      setMessages([...messages, { content: newMessage, sender }]);
      setNewMessage("");
    }
  };

  return (
    <div className="aziz container">
      <SidebarDash />
      <div className="chat-section">
        {/* ChatRoom component */}
        <h5 className="font-weight-bold mb-3 text-center text-white">
          Member
        </h5>
        <div className="card mask-custom">
          <div className="card-body">
            <ul className="list-unstyled mb-0">
              <li className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between link-light">
                  <div className="d-flex flex-row">
                    <img
                      src="https://placekitten.com/60/60"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="60"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">John Doe</p>
                      <p className="small text-white">Hello, Are you there?</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-white mb-1">Just now</p>
                    <span className="badge bg-danger float-end">1</span>
                  </div>
                </a>
              </li>
              {/* Add more list items as needed */}
            </ul>
          </div>
        </div>
      </div>

      <div className="conversation-section">
        {/* Conversation component */}
        <div className="conversation-container">
          <ul className="list-unstyled text-white">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`d-flex justify-content-between mb-4 ${
                  message.sender !== "John Doe" ? "blue-background" : ""
                }`}
              >
                <img
                  src="https://placekitten.com/60/60"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <div className="card mask-custom">
                  <div className="card-header d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">{message.sender}</p>
                    <p className="text-light small mb-0">
                      <i className="far fa-clock"></i> Just now
                    </p>
                  </div>
                  <div className="card-body">
                    <p className="mb-0">{message.content}</p>
                  </div>
                </div>
              </li>
            ))}
            <div ref={messagesEndRef}></div>
            {/* Add more list items as needed */}
          </ul>
        </div>
        {/* Input and Send button */}
        <div className="input-container">
          <div className="form-outline form-white flex-grow-1">
            <textarea
              className="form-control"
              id="textAreaExample3"
              rows="4"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <label className="form-label" htmlFor="textAreaExample3">
              Message
            </label>
          </div>
          <button
            type="button"
            className="btn btn-light btn-lg btn-rounded"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;


