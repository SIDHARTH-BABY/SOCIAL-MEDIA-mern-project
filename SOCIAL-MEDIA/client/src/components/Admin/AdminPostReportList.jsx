import React, { useEffect, useState } from "react";
import { Table, Divider, Tag, Button } from "antd";
import axios from "axios";

const AdminPostReportList = () => {
  const [posts, setPosts] = useState([]);

  const { Column } = Table;
  useEffect(() => {
    const getReportedPosts = async () => {
      const response = await axios.get(
        "http://localhost:5000/posts/reported-posts"
      );

      if (response.data.success) {
        setPosts(response.data.formattedPosts);
      }
    };

    getReportedPosts();
  }, []);

  return (
    <div>
      <Table dataSource={posts}>
        <Column title="UserName" dataIndex="firstName" key="firstName" />
        <Column title="Post Id" dataIndex="_id" key="PostId" />
        <Column title="Location" dataIndex="location" key="location" />
      </Table>
    </div>
  );
};

export default AdminPostReportList;
