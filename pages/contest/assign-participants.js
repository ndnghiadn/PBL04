import { Breadcrumb, Button, Layout, Form, Select } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
const { Option } = Select;

const AssignParticipantsPage = () => {
  const [form] = Form.useForm();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleSelectChange = (value) => {
    console.log("value select", value);
  };

  const handleSubmit = (values) => {
    console.log(values);
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
        <Breadcrumb.Item>Contest</Breadcrumb.Item>
        <Breadcrumb.Item>Assign Participants</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ width: "400px" }}
          >
            <Form.Item
              label="Contest"
              name="contest"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select onChange={handleSelectChange} allowClear>
                <Option value="semifinal">Kiểm thử xâm nhập</Option>
                <Option value="final">Chuyên đề ATTT</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Participants"
              name="participants"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                defaultValue={["A", "B"]}
                onChange={handleChange}
              >
                <Option value="A">Nguyen Van A</Option>
                <Option value="B">Le Van B</Option>
                <Option value="C">Tran Van C</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary">Assign</Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default AssignParticipantsPage;
