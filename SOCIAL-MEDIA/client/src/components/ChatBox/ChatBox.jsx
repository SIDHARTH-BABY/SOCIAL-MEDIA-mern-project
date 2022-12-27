import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ChatBox = ({ chat, currentUser }) => {
  const [userData, setUserData] = useState(null);
  const token = useSelector((state) => state.token);
  //Fetching data for header

  useEffect(() => {
    // const userId = chat.members.find((id) => id !== currentUser);
    const userId = chat?.members?chat.members.find((id) => id !== currentUser) : console.log('kello');
   
    // var userId = chat
    //   ? chat.members.find((id) => id !== currentUser)
    //   : console.log("hello");
console.log(userId,"chatBox UserId");
    const getUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data, "chatBox kitummo");
        setUserData(data);
      } catch (error) {
        console.log(error, "paraa");
      }
    };
    getUserData()
  },[chat, currentUser]);
  return (
    <>
      <div className="ChatBox-container"></div>
    </>
  );
};

export default ChatBox;
