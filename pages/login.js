import Head from "next/head";
import React from "react";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import Logo from "../components/Logo";
import authApi from "../api/authApi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
`;
const StyledForm = styled(Form)`
  width: 500px;
  padding: 50px 0;
  background-color: aliceblue;
  border-radius: 8px;
`;
const StyledButton = styled(Button)`
  display: block;
  margin: -50px auto 0;
`;
const StyledH2 = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
`;

const login = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleLogin = async () => {
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");
    try {
      const response = await authApi.login({ username, password });
      
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.data));

      toast.success("Login successfully !")
      router.push("/");
    } catch (err) {
      toast.error("Login FAILED !!!")
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Online Exam App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <StyledForm
          form={form}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Logo width="700" height="150" />
          <StyledH2>Login</StyledH2>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item>
          <StyledButton type="primary" onClick={handleLogin}>
            Login
          </StyledButton>
        </StyledForm>
      </Container>
    </>
  );
};

export default login;
