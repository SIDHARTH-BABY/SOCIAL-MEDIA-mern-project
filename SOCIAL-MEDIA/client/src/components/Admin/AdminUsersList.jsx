import React from "react";

import { Table, Divider, Tag } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const AdminUsersList = () => {
  const [user, setUser] = useState([])

  const { Column } = Table;

  // const usersList = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/admin/get-users");

  //     if (response.data.success) {
  //       setAllUsers(response.data.formattedFriends);
  //       console.log(allUsers, "kittuo");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    async function usersList () {
      try {
        const userData = await axios.get(
          "http://localhost:5000/admin/get-users"
        );

        if (userData.data.success) {
          setUser(userData.data.formattedFriends);
          console.log(user, "kittuo");
        }
      } catch (error) {
        console.log(error);
      }
    };
    usersList();
  }, []);

 
   
  
    // useEffect(() => {
    //   async function getUsers () {
    //     const userData = await axios.get("http://localhost:5000/admin/get-users")
    //     if (userData.status === 200) {
    //       setUser(userData.data.users)
        
    //     } else {
    //       alert('error occured')
    //     }
    //   }
    //   getUsers()
    // }, [])

  const data = [
    {
      key: "1",
      firstName: "John",

      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      firstName: "Jim",

      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      firstName: "Joe",

      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div>
      <Table dataSource={data}>
        <Column title="Name" dataIndex="firstName" key="firstName" />

        <Column title="Email" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />

        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a>Invite {record.lastName}</a>
              <Divider type="vertical" />
              <a>Delete</a>
            </span>
          )}
        />
      </Table>
    </div>
  );
};
export default AdminUsersList;
