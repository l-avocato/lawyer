import "./allclient.css";
import React, { useState, useMemo } from "react";
import { Space, notification, Table, Button, Modal } from "antd";
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const App = ({ user, deleteUser }) => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [userToDelete, setUserToDelete]=useState({}); 

  const Context = React.createContext({
    name: "Default",
  });

  const openNotification = (placement, userName) => {
    notification.success({
      message: ``,
      description: `User ${userName} has been deleted successfully.`,
      placement,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const showModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Image",
      key: "image",
      dataIndex: "ImageUrl",
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
      dataIndex: "CIN",
      key: "age",
    },
    {
      title: "Address Email",
      dataIndex: "email",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "address",
    },
    {
      title:(<div style={{ textAlign: 'center' }}>
 Action
      </div>),
      key: "action",
    
      
      render: (_, record) => (
        <Space size="middle" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <button
            style={{
              backgroundColor: "grey",
              color: "white",
              height: "32px",
              width:'64px',
              border: "none",
              borderRadius: "5px"
            }}
            onClick={() => {
              navigate("/clientDetails", { state: { user: record } });
            }}
          >
            View
          </button>
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              setUserToDelete(record);
              showModal(e);
            }}
            danger
          >
            Delete
          </Button>
          <Modal
            title={`Delete ${record.fullName}`}
            visible={isModalOpen}
            onCancel={handleCancel}
            mask={false}
            style={{ boxShadow: "none" }}
            footer={[
              <Button   key="cancel"
              type="primary" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="confirm"
                type="primary"
                danger
                onClick={async (e) => {
                  e.preventDefault();
                  console.log(record.id)
                  await deleteUser(userToDelete.id);
                  handleOk();
                  openNotification("topRight", userToDelete.fullName);
                }}
              >
                Confirm
              </Button>,
            ]}
          >
            <p>Are you sure you want to delete this user</p>
          </Modal>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

 
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <div
          style={{
          }}
        >
          <span
            style={{
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <div>
          <Table
            pagination={{ pageSize: 6}}
            columns={columns}
            dataSource={user}
            size="small"
          />
        </div>{" "}
      </Context.Provider>
    </div>
  );
};

export default App;
