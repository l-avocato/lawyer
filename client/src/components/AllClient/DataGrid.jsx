import React, { useState } from "react";
import { Space, Table, Tag, Button } from "antd";


const App = ({ user, deleteUser }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Image",
      key: "image",
      dataIndex: "imageUrl",
      render: (image) => (
        <img
          src={image}
          alt="User Image"
          style={{ width: "50px", height: "50px", borderRadius: "0.5rem" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "CIN",
      dataIndex: "cin",
      key: "age",
    },
    {
      title: "Address Email",
      dataIndex: "email",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "PhoneNumber",
      key: "address",
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <button style={{backgroundColor:'grey', color:'white', padding:"0.4rem 0.8rem"}} >View {record.name}</button>
            <button style={{backgroundColor:'grey', color:'white', padding:"0.4rem 0.8rem"}}  onClick={() => deleteUser(record.id)}>Delete</button>
          </Space>
        ),
      },
  ];

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <div>
        <Table
          pagination={{ pageSize: 7 }}
          columns={columns}
          dataSource={user}
          size="small"
        />
      </div>{" "}
    </div>
  );
};
export default App;
