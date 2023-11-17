import React, { useState } from "react";
import { Space, notification, Table, Button, Modal } from "antd";
import "./aziz.css";
import axios from 'axios'


const App = ({ appointments, deleteAppointment, setId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: "Age",
  //     dataIndex: "age",
  //     key: "age",
  //   },
  //   {
  //     title: "Address",
  //     dataIndex: "Address",
  //     key: "Address",
  //   },
  //   {
  //     title: "Reasons",
  //     key: "Reasons",
  //     dataIndex: "Reasons",
  //     render: (_, { tags }) => (
  //       <>
  //         {tags?.map((tag) => {
  //           let color = tag.length > 5 ? "geekblue" : "green";
  //           if (tag === "loser") {
  //             color = "volcano";
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <button
  //           className="btnA"
  //           style={{
  //             width: "5rem",
  //             backgroundColor: "green",
  //             color: "white",
  //             borderRadius: "2rem",
  //             border: "none",
  //           }}>
  //           Accept
  //         </button>
  //         <button
  //           className="btnB"
  //           style={{
  //             width: "5rem",
  //             backgroundColor: "red",
  //             color: "white",
  //             borderRadius: "2rem",
  //             border: "none",
  //           }}>
  //           Delete
  //         </button>
  //       </Space>
  //     ),
  //   },
  // ];


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
      // render: (text) => <a>{text}</a>,
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
      // render: (_, { tags }) => (
      //   <>
      //     {tags?.map((tag) => {
      //       let color = tag.length > 5 ? "geekblue" : "green";
      //       if (tag === "loser") {
      //         color = "volcano";
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
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
        name: e.user?.fullName,
        time: e?.time,
        Reason: e.reason,
        id: e.id
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
