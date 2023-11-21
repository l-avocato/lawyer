import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

import SidebarDash from "../SidebarDash/SidebarDash";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";

const Statestique = () => {
  return (
    <div style={{display:'flex'}}>
      <SidebarDash />
      <div style={{ display: "flex",flexDirection:'column',width:'100%' }}>
        <NavbarDashboard />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            
          }}
        >
          <div style={{ border: "1px solid #ccc", padding: "20px" }}>
            <p> All clients </p>
            <BarChart
              xAxis={[
                { scaleType: "band", data: ["group A", "group B", "group C"] },
              ]}
              series={[
                { data: [4, 3, 5] },
                { data: [1, 6, 3] },
                { data: [2, 5, 6] },
              ]}
              width={450}
              height={250}
            />
            <p>All cases </p>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: ["bar A", "bar B", "bar C"],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: [2, 5, 3],
                },
              ]}
              width={450}
              height={250}
            />
          </div>

          <div style={{ border: "1px solid #ccc", padding: "20px" }}>
            <div>
              <p> All Phases </p>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                width={450}
                height={250}
              />
            </div>

            <div style={{ border: "1px solid #ccc", padding: "20px" }}>
              <p> All lawyers</p>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "series A" },
                      { id: 1, value: 15, label: "series B" },
                      { id: 2, value: 20, label: "series C" },
                    ],
                  },
                ]}
                width={450}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statestique;
