import React, { useState } from "react";
import { Table, Divider, Tag, Button } from "antd";
const AdminPostReportList = () => {
  const [user, setUser] = useState([]);

  const { Column } = Table;
  return (
    <div>
      <Table dataSource={""}>
        <Column title="UserName" dataIndex="firstName" key="firstName" />
        <Column title="Post Id" dataIndex="location" key="location" />
        <Column title="No: of Reports" dataIndex="email" key="age" />

        <Column
          title="Action"
          key="action"
          render={(record) => (
            <span>
              <Button type="primary">Block</Button>

              <Divider type="vertical" />

              <Button type="primary">UnBlock</Button>
            </span>
          )}
        />
      </Table>
    </div>
  );
};

export default AdminPostReportList;
