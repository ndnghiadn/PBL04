import { Breadcrumb, Layout, Select, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import contestApi from "../api/contestApi";
import resultApi from "../api/resultApi";
const { Option } = Select;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Time (Minutes)",
    dataIndex: "time",
    sorter: (a, b) => a.time - b.time,
  },
  {
    title: "Points",
    dataIndex: "points",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.points - b.points,
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const ResultPage = () => {
  const [contests, setContests] = useState([]);
  const [selectedContestId, setSelectedContestId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const contestRes = await contestApi.getAllContests();
        setContests(contestRes.data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await resultApi.getResultByContestId(
          selectedContestId
        );
        const tmp = response.data.data.map((item) => ({
          key: item._id,
          name: item.info.fullname
            ? `${item.info.username} | ${item.info.fullname}`
            : item.info.username,
          time: item.time,
          points: item.point,
        }));
        setData(tmp);
      } catch (err) {
        console.error(err);
        setData([]);
      }
    })();
  }, [selectedContestId]);

  return (
    <Layout
      style={{
        padding: "0 24px 24px",
      }}
    >
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Result</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Select
          onChange={(value) => setSelectedContestId(value)}
          allowClear
          style={{ width: "200px", marginBottom: "15px" }}
        >
          {contests.map((contest) => (
            <Option value={contest._id} key={contest._id}>
              {contest.title}
            </Option>
          ))}
        </Select>

        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Content>
    </Layout>
  );
};

export default ResultPage;
