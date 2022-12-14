import { Breadcrumb, Button, Layout, Form, Select } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import contestApi from "../../api/contestApi";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
const { Option } = Select;

const AssignParticipantsPage = () => {
  const [form] = Form.useForm();
  const [contests, setContests] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    contestId: "",
    participants: [],
  });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const contestRes = await contestApi.getAllContests();
        const userRes = await userApi.getAllUsers();
        setContests(contestRes.data.data);
        setUsers(userRes.data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleAssignParticipants = async () => {
    try {
      await contestApi.assignParticipants(data.contestId, {
        participants: data.participants,
      });

      toast.success("Assign participants successfully !");
    } catch (err) {
      toast.error("Assign participants FAILED !!!");
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
          <Form form={form} layout="vertical" style={{ width: "400px" }}>
            <Form.Item
              label="Contest"
              name="contest"
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
                    contestId: value,
                  })
                }
                allowClear
              >
                {contests.map((contest) => (
                  <Option value={contest._id} key={contest._id}>
                    {contest.title}
                  </Option>
                ))}
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
                onChange={(value) =>
                  setData({
                    ...data,
                    participants: value,
                  })
                }
              >
                {users.map((user) => (
                  <Option value={user._id} key={user._id}>
                    {user.username}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={handleAssignParticipants}
                type="primary"
                disabled={userData?.role == "admin" ? false : true}
              >
                Assign
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default AssignParticipantsPage;
