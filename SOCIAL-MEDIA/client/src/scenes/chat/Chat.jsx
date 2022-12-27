import { Box } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatBox from "../../components/ChatBox/ChatBox";

import Navbar from "../navbar";

import ConversationWidget from "../widgets/ConversationWidget";
import "./chat.css";

const Chat = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  console.log(user, "chat");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/chat/${user._id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data, "kittiyoo");
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);
  return (
    <Box>
      <Navbar />
      <Box>
        <div className="Chat">
          {/* Left Side */}
          <div className="Left-side-chat">
            <div className="Chat-container">
              <h2>Chat</h2>
              <div className="Chat-list">
                {chats.map((chat) => (
                  <div
                    onClick={() => {
                      setCurrentChat(chat);
                    }}
                  >
                    <ConversationWidget data={chat} currentUserId={user._id} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="Right-side-chat">
            Right side
            <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
            {/* Chat Body */}
            <ChatBox
              chat={currentChat}
              currentUser={user._id}
             
            />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
