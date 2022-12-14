import { Breadcrumb, Button, Layout, Form, Select, Input } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import bunkerApi from "../../api/bunkerApi";
const { Option } = Select;

const AssignParticipantsPage = () => {
  const [form] = Form.useForm();
  const [bunkers, setBunkers] = useState([]);
  const [selectedBunkerId, setSelectedBunkerId] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await bunkerApi.getAllBunkers();
        setBunkers(response.data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleSelectChange = (value) => {
    setSelectedBunkerId(value);
  };

  const handleAddQuestions = async () => {
    try {
      await bunkerApi.addQuestions(
        selectedBunkerId,
        form.getFieldValue("data")
      );

      form.setFieldValue("data", "");
      toast.success("Add questions successfully !");
    } catch (err) {
      toast.error("Add questions FAILED !!!");
      console.log(err);
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
        <Breadcrumb.Item>Add Questions</Breadcrumb.Item>
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
              label="Bunker"
              name="bunker"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select onChange={handleSelectChange} allowClear>
                {bunkers.map((bunker) => (
                  <Option value={bunker._id} key={bunker._id}>
                    {bunker.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Data"
              name="data"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={handleAddQuestions}
                type="primary"
                disabled={userData?.role == "admin" ? false : true}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default AssignParticipantsPage;
