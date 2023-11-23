import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Space, Modal, Form, Input, Select, AutoComplete } from "antd";
import Box from "@mui/system/Box";
import { useNavigate } from "react-router-dom";
import SidebarDash from "../SidebarDash/SidebarDash";
import { DataGrid } from "@mui/x-data-grid";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { FIREBASE_AUTH } from "../../firebaseconfig";

const CaseHistory = () => {
  const [cases, setCases] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  // const handleAddCase = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:1128/api/case/addCase",
  //       {
  //         title,
  //         details,
  //         number,
  //         client: type,
  //         userId: userId,
  //         lawyerId: lawyer.id,
  //       }
  //     );
  //     setRefrech(!refrech);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchCasesData = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH.currentUser.email;
      const response = await axios.get(
        `http://localhost:1128/api/case/case/lawyer/${loggedInLawyer}`
      );
      setCases(response.data);

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
    Promise.all([fetchCasesData(), getLawyer(), getLawyerClients()]).catch(
      console.error
    );
  }, []);

  const handleView = (id) => {
    console.log("View case with ID:", id);
    navigate(`/CaseProfile/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting case with ID:", id);
      await axios.delete(`http://localhost:1128/api/case/deleteCase/${id}`);
      console.log("Successfully deleted case with ID:", id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
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

  const NewCaseForm = React.memo(({ onFinish }) => {
    const [form] = Form.useForm();
    const [selectedOption, setSelectedOption] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [title, setTitle] = useState("");
    const [number, setNumber] = useState(0);
    const [details, setDetails] = useState("");
    const [type, setType] = useState("plaintiff");
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [refrech, setRefrech] = useState(false);
    const [userId, setUserId] = useState(0);
    const options = users.map((user) => ({ value: user.fullName }));

    const handleOk = async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:1128/api/case/addCase",
          {
            title,
            details,
            number,
            client: type,
            userId: userId,
            lawyerId: lawyer.id,
          }
        );
        setRefrech(!refrech);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="number"
          label="Case Number"
          rules={[{ required: true }]}
        >
          <Input
            type="number"
            value={number}
            onChange={(event) => {
              setNumber(event.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="client"
          label="Client Name"
          rules={[{ required: false }]}
        >
          <Select
            value={inputValue}
            style={{ width: 200 }}
            onSelect={(value) => {
              const selectedUser = users.find(
                (user) => user.fullName === value
              );
              setUser(selectedUser);
              form.setFieldsValue({ client: selectedUser.fullName });
              setInputValue(selectedUser.fullName);
              setUserId(selectedUser.id);
            }}
          >
            {users.map((user) => (
              <Select.Option key={user.id} value={user.fullName}>
                {user.fullName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="clientType" label="Client Type">
          <Select
            placeholder="Select client type"
            onSelect={(selected) => {
              setType(selected);
            }}
            allowClear
          >
            <Select.Option value="plaintiff">Plaintiff</Select.Option>
            <Select.Option value="defendant">Defendant</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Item>
        <Form.Item name="details" label="Details" rules={[{ required: true }]}>
          <Input.TextArea style={{ height: 200 }} />
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
    { field: "details", headerName: "Details", width: 150 },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => navigate(`/CaseProfile`)}
            style={{ fontSize: "12px" }}
          >
            View Phases
          </Button>
          <Button
            type="danger"
            style={{ backgroundColor: "red", color: "white", fontSize: "12px" }}
            onClick={() => handleDelete(params.row.id)}
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
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Button
            type="primary"
            onClick={showModal}
            style={{ width: 150, height: 50, left: 1020, marginTop: 50 }}
          >
            Open New Case
          </Button>
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
              // users={users}
              // setUser={setUser}
              // setUserId={setUserId}
            />
          </Modal>
        </div>
        <Box
          sx={{
            width: "90%",
            height: "60%",
          }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
};

export default CaseHistory;
