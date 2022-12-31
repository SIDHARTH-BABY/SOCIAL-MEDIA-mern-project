import React from "react";

import { Table, Divider, Tag } from "antd";
import axios from "axios";
import { useEffect } from "react";

const AdminUsersList = () => {
  const { Column, ColumnGroup } = Table;

  const usersList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/get-users");
      if (response.data.success) {
        console.log(response.data.formattedFriends);
      }
    } catch (error) {}
  };

  useEffect(()=>{
    usersList()
  },[])

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
