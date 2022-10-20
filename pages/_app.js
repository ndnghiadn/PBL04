import "../styles/globals.css";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import Logo from "../components/Logo";
import styled from "styled-components";
const { Header, Footer, Sider, Content } = Layout;
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const sidebarItems = [
  {
    key: 1,
    label: "Make contest",
    icon: React.createElement(LaptopOutlined),
    children: [
      {
        key: 11,
        label: "Khoa hoc du lieu",
      },
      {
        key: 12,
        label: "Tri tue nhan tao",
      },
    ],
  },
  {
    key: 2,
    label: "Contest",
    icon: React.createElement(LaptopOutlined),
    children: [
      {
        key: 21,
        label: "Create",
      },
      {
        key: 22,
        label: "Assign participants",
      },
    ],
  },
  {
    key: 3,
    label: "Result",
    icon: React.createElement(UserOutlined),
  },
];

const Links = [
  { key: 11, link: `/contest/11`},
  { key: 12, link: `/contest/12`},
  { key: 21, link: `/contest/create`},
  { key: 22, link: `/contest/assign-participants`},
  { key: 3, link: `/result`},
]

const StyledSpan = styled.span`
  text-align: right;
  color: #fff;
`;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const handleClickSidebar = (e) => {
    const foundItem = Links.find(link => link.key == e.key);
    if (!foundItem) return;
    router.push(foundItem.link);
  };

  return (
    <>
      <Head>
        <title>Online Exam App</title>
        <meta name="description" content="Online Exam App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {router.asPath === "/login" ||
      router.asPath.startsWith("/contest/doing") ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Header className="header">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Logo width="200" height="70" />
              <StyledSpan>
                You are logging as ndnghiadn.{" "}
                <Link href="/login" style={{ textDecoration: "underline" }}>
                  Log out
                </Link>
              </StyledSpan>
            </div>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                onClick={handleClickSidebar}
                mode="inline"
                style={{
                  minHeight: "calc(100vh - 70px)",
                  borderRight: 0,
                }}
                items={sidebarItems}
              />
            </Sider>
            <Component {...pageProps} />
          </Layout>
        </Layout>
      )}
    </>
  );
}

export default MyApp;
