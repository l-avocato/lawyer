import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";
import SidebarDash from "../SidebarDash/SidebarDash";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import axios from "axios";
import { FIREBASE_AUTH, db } from "../../firebaseconfig";

const Statestique = () => {
  const [users, setUsers] = useState([]);
  const [refrech, setRefrech] = useState(false);
  const [lawyer, setLawyer] = useState({});
  const [cases, setCases] = useState([]);
  const [clientCount, setClientCount] = useState(0);
  const [caseCount, setCaseCount] = useState(0);
  const [phases, setPhases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paidCount, setPaidCount] = useState(0);
  const [notPaidCount, setNotPaidCount] = useState(0);
  const [totalPaidPrice, setTotalPaidPrice] = useState(0);
  const [totalNotPaidPrice, setTotalNotPaidPrice] = useState(0);

  const getLawyer = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH.currentUser.email;
      console.log(loggedInLawyer);
      const res = await axios.get(
        `http://localhost:1128/api/lawyer/getLawyerByEmail/${loggedInLawyer}`
      );
      console.log("this is lawyer", res.data);
      setLawyer(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCasesData = async () => {
    try {
      const loggedInLawyer = FIREBASE_AUTH.currentUser.email;
      const response = await axios.get(
        `http://localhost:1128/api/case/case/lawyer/${loggedInLawyer}`
      );
      setCases(response.data.reverse());
      setCaseCount(response.data.length);

      const data2 = response.data.map((data) => ({
        id: data.id,
        fullName: data.user?.fullName,
        imageUrl: data.user?.ImageUrl,
        title: data.title,
        number: data.number,
        createdAt: data.createdAt.slice(0, 10),
        details: data.details,
      }));
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const getLawyerClients = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1128/api/user_lawyer/getClientsByLawyerId/${lawyer.id}`
      );
      setUsers(response.data[0].users.reverse());
      setClientCount(response.data[0].users.length);
      console.log("this is clients", response.data);
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  const getPhases = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:1128/api/phase/getPhasesByLawyerId/${lawyer?.id}`
      );
      setPhases(response.data);
      console.log("this is phases", response.data);
      setIsLoading(false);

      // Calculate the paid and not paid counts
      const paidCount = response.data.filter((phase) => phase.IsPaid).length;
      const notPaidCount = response.data.length - paidCount;
      setPaidCount(paidCount);
      setNotPaidCount(notPaidCount);

      // Calculate the total price for paid and not paid phases
      const totalPaidPrice = response.data
        .filter((phase) => phase.IsPaid)
        .reduce((sum, phase) => sum + phase.price, 0);

      const totalNotPaidPrice = response.data
        .filter((phase) => !phase.IsPaid)
        .reduce((sum, phase) => sum + phase.price, 0);

      setTotalPaidPrice(totalPaidPrice);
      setTotalNotPaidPrice(totalNotPaidPrice);
    } catch (error) {
      console.error("Error fetching phases", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLawyer();
  }, [refrech]);

  useEffect(() => {
    getLawyerClients();
    fetchCasesData();
    getPhases();
  }, [lawyer]);
  const barData = [{ name: "All Clients", count: clientCount }];
  const barData2 = [{ name: "All Cases", count: caseCount }];

  const pieData = [
    { name: "Paid", value: paidCount },
    { name: "Not Paid", value: notPaidCount },
  ];

  return (
    <div style={{ display: "flex" }}>
      <SidebarDash />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <NavbarDashboard />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flex: 1,
            overflow: "auto",
            maxHeight: "calc(100vh - 60px)", // adjust this value based on your Navbar's height
            scrollbarWidth: "thin" /* For Firefox */,
            scrollbarColor: "transparent transparent" /* For Firefox */,
          }}
        >
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              overflow: "auto",
              maxHeight: "calc(100vh - 60px)",
            }}
          >
            <p> All clients </p>
            <BarChart
              width={500}
              height={250}
              data={barData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#AF9839" // Change this to your desired color
                animationDuration={500}
                barSize={300}
              >
                <LabelList dataKey="count" position="top" />
              </Bar>
            </BarChart>
            <p>All cases </p>
            <BarChart
              width={500}
              height={250}
              data={barData2}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#AF9839" // Change this to your desired color
                animationDuration={500}
                barSize={300}
              >
                <LabelList dataKey="count" position="top" />
              </Bar>
            </BarChart>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              overflow: "auto",
              maxHeight: "calc(100vh - 60px)",
            }}
          >
            <div style={{ border: "1px solid #ccc", padding: "20px" }}>
              <p>All Payments</p>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={true}
                  data={pieData}
                  cx={200}
                  cy={200}
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={["#4caf50", "#ff6347"][index % 3]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#4CAF50",
                      width: "170px",
                      borderRadius: "20px",
                      padding: "20px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Total Paid ${totalPaidPrice}
                    </p>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#FF6347",
                      width: "170px",
                      borderRadius: "20px",
                      padding: "20px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Total Not Paid ${totalNotPaidPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statestique;
