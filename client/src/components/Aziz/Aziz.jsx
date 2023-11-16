import React from "react";
import { Space, Table, Tag } from "antd";
import "./aziz.css";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "Address",
    key: "Address",
  },
  {
    title: "Reasons",
    key: "Reasons",
    dataIndex: "Reasons",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
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
          }}>
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
          }}>
          Delete
        </button>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    Address: "New York No. 1 Lake Park",
    tags: ["criminal"],
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    Address: "New York No. 1 Lake Park",
    tags: ["criminal"],
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    Address: "New York No. 1 Lake Park",
    tags: ["criminal"],
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    Address: "New York No. 1 Lake Park",
    tags: ["criminal"],
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    Address: "New York No. 1 Lake Park",
    tags: ["criminal"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    Address: "London No. 1 Lake Park",
    tags: ["family"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    Address: "Sydney No. 1 Lake Park",
    tags: ["criminal"],
  },
];
const App = () => (
  <Table
    className="table10"
    columns={columns}
    dataSource={data}
    pagination={{ pageSize: 8 }}
    size="large"
  />
);
export default App;
