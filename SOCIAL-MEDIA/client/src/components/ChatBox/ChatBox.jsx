import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./chatBox.css";
import { format } from "timeago.js";

// import InputEmoji from "react-input-emoji";
import axios from "axios";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage  }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const token = useSelector((state) => state.token);
 

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  //Fetching data for header

  useEffect(() => {
    const userId = chat
      ? chat.members
        ? chat.members.find((id) => id !== currentUser)
        : console.log("hello")
      : console.log("hello2");

    console.log(userId, "chatBox UserId");
    const getUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data, "ippo vannatha");
        setUserData(data);
      } catch (error) {
        console.log(error, "paraa");
      }
    };
    getUserData();
  }, [chat, currentUser]);

  // Fetching Data from Messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log(chat, "prefer");
        console.log(chat._id, "hello world");
        const response = await fetch(
          `http://localhost:5000/message/${chat._id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        console.log(data, "chat detailsss");
        setMessages(data);
      } catch (error) {
        console.log(error, "nokkaa");
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);


  

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    console.log(message, "measage");
    //Send message to database
    try {
      const { data } = await axios.post(
        "http://localhost:5000/message",
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        console.log(data, "new chat111111111111");

        setMessages([...messages, data]);
        console.log(messages, "kitiianam");
        setNewMessage("");
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.log(error, "error ividee");
    }

    //Send Message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      console.log(receivedMessage, "data received  from child chat box");
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

    // Always scroll to last Message
    // useEffect(() => {
    //   scroll.current?scroll.current.scrollIntoView({ behavior: "smooth" }): "";
    // }, [messages]);

    const scroll = useRef();
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div className="follower conversation">
                  <div>
                    <img
                      src={`http://localhost:5000/assets/${
                        userData
                          ? userData.picturePath
                          : console.log("nothinggg")
                      }`}
                      alt="user"
                      className="followerImage"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="name" style={{ fontSize: "0.8rem" }}>
                      <span>
                        {userData ? userData.firstName : ""}{" "}
                        {userData ? userData.lastName : ""}
                      </span>
                      <br/>
                    
                    </div>
                  </div>
                </div>
                <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
              </div>
            </div>
            {/* ChatBox Messages */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* Chat Sender */}
            <div className="chat-sender">
              <div>+</div>

              <input
                type="text"
                sx={{ fontSize: "25px" }}
                placeholder="Message"
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
              {/* <InputEmoji value={newMessage} onChage={handleChange} /> */}
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on chat to start convesation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
