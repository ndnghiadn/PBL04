import {
  Breadcrumb,
  Button,
  Layout,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
const { Option } = Select;
const { RangePicker } = DatePicker;

const CreateContestPage = () => {
  const [form] = Form.useForm();

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
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
        <Breadcrumb.Item>Create</Breadcrumb.Item>
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
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select onChange={handleSelectChange} allowClear>
                <Option value="semifinal">Semi-Final</Option>
                <Option value="final">Final</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Chọn kho đề"
              name="lesson"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select onChange={handleSelectChange} allowClear>
                <Option value="ai">Trí tuệ Nhân tạo</Option>
                <Option value="final">Kiểm thử Xâm nhập</Option>
                <Option value="other">Blockchain</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Time"
              name="time"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <RangePicker
                style={{ width: "400px" }}
                showTime={{
                  format: "HH:mm",
                }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
                onOk={onOk}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Create</Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateContestPage;
