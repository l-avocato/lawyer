import { GiftedChat } from "react-web-gifted-chat";
import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        id: 2,
        name: "React",
        avatar: "https://facebook.github.io/react/img/logo_og.png",
      },
    },
    // Add more predefined messages if needed
  ]);

  return (
    <GiftedChat
      messages={messages}
      onSend={() => {}}
      user={{
        id: 1,
      }}
    />
  );
};

export default Chat;
