import React, { useState, useEffect } from "react";
import "./style.css";
import SidebarDash from "../SidebarDash/SidebarDash";
import axios from "axios";
import { Table, Space, Button } from "antd";
import CaseProfile from "../CaseProfile/CaseProfile";
import { useNavigate } from "react-router-dom"; 
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import Navbar from "./../Navbar/Navbar"
const CaseHistory = () => {
  const [cases, setCases] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchCasesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1128/api/case/allCases"
        );
        setCases(response.data);
        const data2 = response.data.map((data) => {
          return {
            id: data._id,
            fullName: data.user?.fullName,
            imageUrl: data.user?.ImageUrl,
            title: data.title,
            number: data.nummber,
            createdAt: data.createdAt,
            details: data.details,
          };
        });
        console.log("this is data 2 ", data2);
        setData(data2);
        console.log(response.data, "im cases");
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchCasesData();
  }, []);

  console.log(data, "this is the needed data   ");
  const deleteUser = async (id) => {
    try {
      console.log("Deleting case with ID:", id);
      await axios.delete(`http://localhost:1128/api/case/deleteCase/${id}`);
      console.log("Successfully deleted case with ID:", id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting case:", error.message);
    }
  };

  const columns = [
    // {
    //   title: "image",
    //   dataIndex: "imageUrl",
    //   key: "image",
    //   render: (image) => (
    //     <img
    //       src={image}
    //       alt="User Image"
    //       style={{ width: "50px", height: "50px", borderRadius: "0.5rem" }}
    //     />
    //   ),
    // },
    {
      title: "case title",
      dataIndex: "title",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "client name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "case details",
      dataIndex: "details",
      key: "address",
    },
    {
      title: "created date",
      dataIndex: "createdAt",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => navigation("/CaseProfile")}>
            View
          </Button>
          <Button type="danger" onClick={() => deleteUser("CaseProfile")}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      {/* <Navbar/> */}
      <SidebarDash />
      <div className="data-grid"> 
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          pagination={{ pageSize: 7 }}
        />
      </div>
    </div>
  );
};

export default CaseHistory;
