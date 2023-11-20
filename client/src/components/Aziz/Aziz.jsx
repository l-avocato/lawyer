import React, { useState } from "react";
import { Space, notification, Table, Button, Modal } from "antd";
import "./aziz.css";
import axios from 'axios'


const App = ({ appointments, deleteAppointment, setId,acceptAppointment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("this",appointments);
  



  const openNotification = (placement, userName) => {
    notification.success({
      message: ``,
      description: `User ${userName} has been deleted successfully.`,
      placement,
    });
  };

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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Reason",
      dataIndex: "Reason",
      key: "Reason",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btnA"
            style={{
              width: "5rem",
              backgroundColor: "green",
              color: "white",
              borderRadius: "2rem",
              border: "none",
            }}
            onClick={() => {
              acceptAppointment(record.id);
            }}
          >
            Accept
          </button>
          <button
            className="btnB"
            style={{
              width: "5rem",
              backgroundColor: "red",
              color: "white",
              borderRadius: "2rem",
              border: "none",
            }}
            onClick={() => {
              setId(record.key)
              showModal()
            }}
          >
            Delete
          </button>
          <Modal
            title={`Delete ${record.name}`}
            open={isModalOpen}
            onOk={() => {
              deleteAppointment(record.id);
              handleOk();
              console.log(record.id, "this is idddddddddddddddddddddddddddddddddddddd");
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
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      tags: ["criminal"],
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      tags: ["criminal"],
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      tags: ["criminal"],
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      tags: ["criminal"],
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      tags: ["criminal"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      tags: ["family"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      tags: ["criminal"],
    },
  ];
  const appointmentData = appointments.map((e, i) => {
    return (
      {
        key: i,
        name: e?.userName,
        time: e?.time,
        Reason: e.reason,
        id: e.id,
        userId: e?.userId, 
        lawyerId: e?.lawyerId 
      }
    )
  })
  console.log("fffffffffffffffffffff,", appointmentData);

  return (
    <Table
      className="table10"
      columns={columns}
      dataSource={appointmentData}
      pagination={{ pageSize: 8 }}
      size="large"
    />
  )

}


export default App;
