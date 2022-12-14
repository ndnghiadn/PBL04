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
import bunkerApi from "../../api/bunkerApi";
import contestApi from "../../api/contestApi";
import { toast } from "react-toastify";
const { Option } = Select;
const { RangePicker } = DatePicker;

const CreateContestPage = () => {
  const [form] = Form.useForm();
  const [bunkers, setBunkers] = useState([]);
  const [data, setData] = useState({
    title: "",
    type: "semi-final",
    bunkerId: "",
    startTime: "",
    endTime: "",
  });
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

  const onChange = (value, dateString) => {
    setData({
      ...data,
      startTime: dateString[0],
      endTime: dateString[1],
    });
  };

  const handleCreateContest = async () => {
    try {
      await contestApi.createContest(data);

      toast.success("Create contest successfully !");
      form.setFieldsValue("");
    } catch (err) {
      toast.error("Create contest FAILED !!!");
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
              <Input
                onChange={(e) =>
                  setData({
                    ...data,
                    title: e.target.value,
                  })
                }
              />
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
              <Select
                onChange={(value) =>
                  setData({
                    ...data,
                    type: value,
                  })
                }
                allowClear
              >
                <Option value="semi-final">Semi-Final</Option>
                <Option value="final">Final</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Bunker"
              name="bunker"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                onChange={(value) =>
                  setData({
                    ...data,
                    bunkerId: value,
                  })
                }
                allowClear
              >
                {bunkers.map((bunker) => (
                  <Option value={bunker._id} key={bunker._id}>
                    {bunker.title}
                  </Option>
                ))}
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
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={handleCreateContest}
                type="primary"
                disabled={userData?.role == "admin" ? false : true}
              >
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
