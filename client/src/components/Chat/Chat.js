// ChatComponent.js

import React, { useState } from "react";
import "./chat.css";
import johnDoeImage from "./client.jpg";
import Sidebardash from "../SidebarDash/SidebarDash.jsx";
import SidebarDash from "../SidebarDash/SidebarDash.jsx";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard.jsx";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentSender, setCurrentSender] = useState("Lawyer");
  const [activeClient, setActiveClient] = useState(null);

  const dummyData = [
    {
      id: 1,
      sender: "Lawyer",
      content: "Hello! How can I assist you today?",
      chatId: 1,
    },
    {
      id: 2,
      sender: "Client",
      content: "Hi, I need legal advice regarding a contract.",
      chatId: 1,
    },
    {
      id: 3,
      sender: "Lawyer",
      content: "Sure, I'd be happy to help. Can you provide more details?",
      chatId: 1,
    },
    // Add more messages as needed
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !activeChat) {
      return;
    }

    const sender = currentSender;
    const receiver = activeClient.name;

    const message = {
      id: messages.length + 1,
      sender: currentSender,
      content: newMessage,
      chatId: activeChat,
    };

    setMessages([...messages, message]);
    setCurrentSender("Lawyer");
    setNewMessage("");
  };

  const handleOpenChat = (client) => {
    setActiveChat(client.id);
    setActiveClient(client);
  };

  const renderChatList = () => {
    const clients = [
      { id: 1, name: "John Doe", image: johnDoeImage },
      { id: 2, name: "Jane Smith", image: johnDoeImage },
      { id: 3, name: "Jane Smith", image: johnDoeImage },
      { id: 4, name: "Jane Smith", image: johnDoeImage },
      { id: 5, name: "Jane Smith", image: johnDoeImage },
      { id: 6, name: "Jane Smith", image: johnDoeImage },
      { id: 7, name: "Jane Smith", image: johnDoeImage },
      { id: 8, name: "Jane Smith", image: johnDoeImage },
      { id: 9, name: "Jane Smith", image: johnDoeImage },
      { id: 10, name: "Jane Smith", image: johnDoeImage },
      { id: 11, name: "Jane Smith", image: johnDoeImage },
      { id: 12, name: "Jane Smith", image: johnDoeImage },
      { id: 13, name: "Jane Smith", image: johnDoeImage },
      // Add more clients as needed
    ];

    return clients.map((client) => (
      <div
        key={client.id}
        className={`chat-room ${activeChat === client.id ? "active" : ""}`}
        onClick={() => handleOpenChat(client)}>
        <img src={client.image} alt={`${client.name} Image`} />
        {client.name}
      </div>
    ));
  };

  const renderMessages = () => {
    const activeChatMessages = messages.filter(
      (message) => message.chatId === activeChat,
    );

    return activeChatMessages.map((message) => (
      <div
        key={message.id}
        className={
          message.sender === "Lawyer" ? "lawyer-message" : "client-message"
        }>
        <img
          src={
            message.sender === "Lawyer"
              ? "client.jpg"
              : activeClient.image
          }
          alt={`${message.sender} Image`}
          className="image"
        />
        <div className="message-content">
          <strong>{message.sender}: </strong>
          {message.content}
        </div>
      </div>
    ));
  };

  return (
    <div style={{ display: "flex" }}>
      <SidebarDash />
      <div className="chat-container">
        <NavbarDashboard />
        <div className="client-chat">
          <div className="chat">
            <h2>Clients</h2>
            <div className="chat-list">{renderChatList()}</div>
          </div>
          <div className="chat-divider" />
          <div className="conversation">
            {activeClient && <h2>{activeClient.name}</h2>}
            <div className="conversation-messages">{renderMessages()}</div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
