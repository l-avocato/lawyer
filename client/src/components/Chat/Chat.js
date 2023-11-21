import React, { useState, useEffect } from "react";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import SidebarDash from "../SidebarDash/SidebarDash";
import css from "./chat.css";

const Chat = () => {
  const [johnDoeMessages, setJohnDoeMessages] = useState([
    {
      sender: "John Doe",
      text: "Hello, Are you there?",
      timestamp: new Date(),
    },
  ]);

  const [laraCroftMessages, setLaraCroftMessages] = useState([
    {
      sender: "Lara Croft",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      timestamp: new Date(),
    },
  ]);

  const [currentChat, setCurrentChat] = useState("John Doe");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSendMessage = () => {
    const newMessage = {
      sender: "You",
      text: "Your message here",
      timestamp: new Date(),
    };

    // Update the messages for the current chat
    if (currentChat === "John Doe") {
      setJohnDoeMessages((prevMessages) => [...prevMessages, newMessage]);
    } else if (currentChat === "Lara Croft") {
      setLaraCroftMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SidebarDash />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          position: "relative",
        }}>
        <NavbarDashboard />

        <section
          id="conversation-section"
          style={{ backgroundColor: "#eee", flex: 1 }}>
          <div
            className="container py-5"
            style={{ display: "flex", flexDirection: "column" }}>
            <div className="row">
              <div
                className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flex: 1,
                  overflow: "auto",
                  marginBottom: "80px",
                }}>
                <div className="card">
                  <div className="card-body">
                    <ul className="list-unstyled mb-0">
                      <li
                        className="p-2 border-bottom"
                        style={{ backgroundColor: "#eee" }}>
                        <a href="#!" className="d-flex justify-content-between">
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">John Doe</p>
                              <p className="small text-muted">
                                Hello, Are you there?
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">Just now</p>
                            <span className="badge bg-danger float-end">1</span>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-bottom">
                        <a href="#!" className="d-flex justify-content-between">
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Danny Smith</p>
                              <p className="small text-muted">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">5 mins ago</p>
                          </div>
                        </a>
                      </li>
                      {/* Add the rest of your list items */}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-7 col-xl-8">
                <div className="talking-bar"
                  style={{
                    backgroundColor: "#fff",
                    borderBottom: "1px solid #ccc",
                    padding: "10px",
                    fontWeight: "bold",
                  }}>
                  Chatting with: {currentChat}
                </div>
                <ul className="list-unstyled">
                  {currentChat === "John Doe"
                    ? johnDoeMessages.map((msg, index) => (
                        <li
                          key={index}
                          className="d-flex justify-content-between mb-4">
                          <img
                            src={`https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp`}
                            alt="avatar"
                            className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                            width="60"
                          />
                          <div className="card">
                            <div className="card-header d-flex justify-content-between p-3">
                              <p className="fw-bold mb-0">{msg.sender}</p>
                              <p className="text-muted small mb-0">
                                <i className="far fa-clock"></i>{" "}
                                {msg.timestamp.toLocaleString()}
                              </p>
                            </div>
                            <div className="card-body">
                              <p className="mb-0">{msg.text}</p>
                            </div>
                          </div>
                        </li>
                      ))
                    : currentChat === "Lara Croft"
                    ? laraCroftMessages.map((msg, index) => (
                        <li
                          key={index}
                          className="d-flex justify-content-between mb-4">
                          <div className="card w-100">
                            <div className="card-header d-flex justify-content-between p-3">
                              <p className="fw-bold mb-0">{msg.sender}</p>
                              <p className="text-muted small mb-0">
                                <i className="far fa-clock"></i>{" "}
                                {msg.timestamp.toLocaleString()}
                              </p>
                            </div>
                            <div className="card-body">
                              <p className="mb-0">{msg.text}</p>
                            </div>
                          </div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                            width="60"
                          />
                        </li>
                      ))
                    : null}
                </ul>
                <div id="container_send" className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    id="textAreaExample2"
                    placeholder="send a message..."
                    rows="4"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}></input>
                  <button
                    type="button"
                    className="btn btn-info btn-rounded send_button"
                    onClick={handleSendMessage}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </section>
      </div>
    </div>
  );
};

export default Chat;
