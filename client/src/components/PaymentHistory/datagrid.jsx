import "./PaymentHistory.css"
import React, { useState, useMemo } from "react";
import { Space, notification, Table, Button, Modal } from "antd";
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const App = ({ payment, deleteUser,setId }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate()


  const payments = payment.map((e)=>{
    return( 
      {
        id:e.id,
        image : e.user?.ImageUrl, 
        fullName: e.user?.fullName,
        CIN : e.user?.CIN,
        email : e.user?.email, 
        phoneNumber : e.user?.phoneNumber


      }
    )
  })

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

  const contextValue = useMemo(() => ({
    name: "Ant Design",
  }), []);

  const showModal = () => {
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
      title: "PaymentId",
      dataIndex: "id",
      key: "age",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
      render: (text, record) => (
        <a onClick={() => {
        
          handlePaymentClick(record)}}>{text}</a>
      ),
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
         
          <Button type="primary" onClick={()=>{
            setId(record.id)
            showModal()}}   danger style={{backgroundColor:'black'}}>
            Delete
          </Button>
          <Modal
            title={`Delete ${record.fullName}`}
            open={isModalOpen}
            onOk={async () => {
              await deleteUser(record.id);
              handleOk();
              openNotification("topRight", record.fullName);
            }}
            onCancel={handleCancel}
            mask={false}
            style={{ boxShadow: "none" }}
            okText="Confirm"
          >
            <p> Are you sure you want to delete this user</p>
          </Modal>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handlePaymentClick = (record) => {
navigate('/PaymentReceipt' ,{ state: { data: record} }
    );
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <Context.Provider value={contextValue}>
        {contextHolder}
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
            dataSource={payments}
            size="small"
            // onRow={(record) => ({
            //   onClick: () => handlePaymentClick(record),
            // })}
           
          />
        </div>{" "}
      </Context.Provider>
    </div>
  );
};

export default App;