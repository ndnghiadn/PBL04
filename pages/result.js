import { Breadcrumb, Layout, Select, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
const { Option } = Select;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Time (Minutes)',
    dataIndex: 'time',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.time - b.time,
  },
  {
    title: 'Points',
    dataIndex: 'points',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.points - b.points,
  },
];
const data = [
  {
    key: '1',
    name: 'Nguyen Van A | 19TCLC_DT1',
    time: 34,
    points: 95
  },
  {
    key: '2',
    name: 'Tran Van B | 19TCLC_DT1',
    time: 56,
    points: 96
  },
  {
    key: '3',
    name: 'Le Thi C | 19TCLC_DT1',
    time: 54,
    points: 91
  },
  {
    key: '4',
    name: 'Tu Ma Y | 19TCLC_DT1',
    time: 50,
    points: 99
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const ResultPage = () => {
  const handleSelectChange = (value) => {
    console.log("value select", value);
  };

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
        <Select onChange={handleSelectChange} allowClear style={{ width: '200px', marginBottom: '15px' }}>
        <Option value="semifinal">Kiểm thử xâm nhập</Option>
                <Option value="final">Chuyên đề ATTT</Option>
        </Select>

        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Content>
    </Layout>
  );
};

export default ResultPage;
