import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Space, Modal, Form, Input, Select, AutoComplete } from "antd";
import Box from "@mui/system/Box";
import { useNavigate } from "react-router-dom";
import SidebarDash from "../SidebarDash/SidebarDash";
import { DataGrid } from "@mui/x-data-grid";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { FIREBASE_AUTH } from "../../firebaseconfig";
import Swal from "sweetalert2";

const CaseHistory = () => {
  const [cases, setCases] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [refrech, setRefrech] = useState(false);

  const getLawyer = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH.currentUser.email;
      console.log(loggedInLawyer);
      const res = await axios.get(
        `http://localhost:1128/api/lawyer/getLawyerByEmail/${loggedInLawyer}`
      );
      setLawyer(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getLawyerClients = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1128/api/user_lawyer/getClientsByLawyerId/${lawyer.id}`
      );
      setUsers(response.data[0].users);
      console.log("this is clients", response.data[0].users);
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  const fetchCasesData = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH.currentUser.email;
      const response = await axios.get(
        `http://localhost:1128/api/case/case/lawyer/${loggedInLawyer}`
      );
      setCases(response.data.reverse());
      const data2 = response.data.map((data) => ({
        id: data.id,
        fullName: data.user?.fullName,
        imageUrl: data.user?.ImageUrl,
        title: data.title,
        number: data.number,
        createdAt: data.createdAt.slice(0, 10),
        details: data.details,
      }));
      setData(data2);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    getLawyer();
  }, [refrech]);

  useEffect(() => {
    fetchCasesData();
    getLawyerClients();
  }, [lawyer]);

  const handleView = (id) => {
    console.log("View case with ID:", id);
    navigate(`/CaseProfile/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting case with ID:", id);
      await axios.delete(`http://localhost:1128/api/case/deleteCase/${id}`);
      setRefrech(!refrech);
      console.log("Successfully deleted case with ID:", id);
      // setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting case:", error.message);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async (values) => {
    try {
      const data = {
        ...values,
        client: values.type,
        lawyerId: lawyer.id,
      };
      console.log("this is data", data);
      const response = await axios.post(
        "http://localhost:1128/api/case/addCase",
        data
      );
      console.log("this is response", response.data);
      setRefrech(!refrech);
    } catch (error) {
      console.log(error);
    }
  };

  const NewCaseForm = React.memo((props) => {
    const [type, setType] = useState("plaintiff");
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(0);
    const [title, setTitle] = useState("");
    const [number, setNumber] = useState(0);
    const [details, setDetails] = useState("");
    const handleSubmit = (obj) => {
      props.onFinish({ ...obj, userId });
    };

    return (
      <Form
        onFinish={(e) => {
          handleSubmit(e);
          setIsModalVisible(false);
        }}
        layout="vertical"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input
            name="title"
            onChange={(e) => {
              // setTitle(e.target.value);
              setTitle(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Number"
          name="number"
          rules={[{ required: true, message: "Please enter the number" }]}
        >
          <Input
            type="number"
            name="number"
            onChange={(e) => {
              // setTitle(e.target.value);
              setNumber(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Details"
          name="details"
          rules={[{ required: true, message: "Please enter the details" }]}
        >
          <Input.TextArea
            name="details"
            onChange={(e) => {
              // setTitle(e.target.value);
              setDetails(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Client"
          name="client"
          rules={[{ required: true, message: "Please select a client" }]}
        >
          <Select
            name="client"
            style={{ color: "black" }}
            onChange={(value) => {
              const selectedUser = users.find((user) => user.id === value);
              console.log(selectedUser.id);
              setUserId(selectedUser.id);
              console.log(userId);
              setUser(selectedUser.fullName);
            }}
            value={user}
          >
            {props.users.map((user) => (
              <Select.Option key={user.id} value={user.id}>
                {user.fullName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select a type" }]}
        >
          <Select defaultValue={type} onChange={(value) => console.log(value)}>
            <Select.Option value="plaintiff">Plaintiff</Select.Option>
            <Select.Option value="defendant">Defendant</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Case
          </Button>
        </Form.Item>
      </Form>
    );
  });

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "imageUrl",
      headerName: "Image",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.imageUrl}
          alt="User Image"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "fullName", headerName: "Full name", width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "number", headerName: "Number", width: 150 },
    { field: "createdAt", headerName: "Opened At", width: 150 },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 300,
      renderCell: (params) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() =>
              navigate(`/CaseProfile`, { state: { case: params.row } })
            }
            style={{ fontSize: "12px" }}
          >
            View Phases
          </Button>
          <Button
            type="danger"
            style={{ fontSize: "12px", backgroundColor: "red", width: "8rem" }}
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDelete(params.row.id);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                }
              });
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <SidebarDash />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <NavbarDashboard />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "16px",
            padding: "15px",
          }}
        >
          <button className="btnAdd-client" onClick={showModal}>
            + New Case
          </button>

          <Modal
            title="New Case"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <NewCaseForm
              onFinish={handleOk}
              // title={title}
              // setTitle={setTitle}
              // number={number}
              // setNumber={setNumber}
              // details={details}
              // setDetails={setDetails}
              // type={type}
              // setType={setType}
              users={users}
              // setUser={setUser}
              // setUserId={setUserId}
            />
          </Modal>
        </div>
        <Box
          sx={{
            width: "98%",
            height: "70%",
            mx: "1%",
          }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            pageSizeOptions={[6]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
};

export default CaseHistory;
