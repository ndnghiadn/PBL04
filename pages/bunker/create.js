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
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import bunkerApi from "../../api/bunkerApi";
const { Option } = Select;
const { RangePicker } = DatePicker;

const CreateContestPage = () => {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  const handleCreateBunker = async () => {
    try {
      await bunkerApi.createBunker({
        title: form.getFieldValue("title"),
      });
      toast.success("Create bunker successfully !");
      form.setFieldValue("title", "");
    } catch (err) {
      toast.error("Create bunker FAILED !!!");
      console.error(err);
    }
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
        <Breadcrumb.Item>Bunker</Breadcrumb.Item>
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
          <Form form={form} layout="vertical" style={{ width: "400px" }}>
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
            <Form.Item>
              <Button onClick={handleCreateBunker} type="primary" disabled={userData?.role == "admin" ? false : true}>
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateContestPage;
