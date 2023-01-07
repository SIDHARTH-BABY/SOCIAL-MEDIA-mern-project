import React from "react";

import { Table, Divider, Tag, Button } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const AdminUsersList = () => {
  const [user, setUser] = useState([]);
  const [active, setActive] = useState([]);

  const { Column } = Table;

  const blockUser = async (userID) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/block-user",
        { userID }
      );

      if (response.data.success) {
        console.log("Blocked");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unBlockUser = async (userID) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/unblock-user",
        { userID }
      );

      if (response.data.success) {
        console.log("unBlocked");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function usersList() {
      try {
        const userData = await axios.get(
          "http://localhost:5000/admin/get-users"
        );

        if (userData.data.success) {
          console.log(userData.data.formattedFriends, "first line admin");
          setUser(userData.data.formattedFriends);
        }
      } catch (error) {
        console.log(error);
      }
    }
    usersList();
  }, []);

  return (
    <div>
      <Table dataSource={user ? user : ""}>
        <Column title="Name" dataIndex="firstName" key="firstName" />
        <Column title="Email" dataIndex="location" key="location" />
        <Column title="Email" dataIndex="email" key="age" />

        <Column
          title="Action"
          key="action"
          render={(record) => (
            <span>
           {record.Active ? (  <Button
                type="primary" 
                danger
                onClick={() => {
                  if (window.confirm("Do you want to block this user?"))
                    blockUser(record._id);

                }}
              >
                Block
              </Button>)

           :

             ( <Button
                type="primary"
                onClick={() => {
                  if (window.confirm("Do you want to unblock this user?"))
                    unBlockUser(record._id);
                }}
              >
                UnBlock
              </Button>)}
            </span>
          )}
        />
      </Table>
    </div>
  );
};
export default AdminUsersList;
