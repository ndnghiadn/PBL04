import "../styles/globals.css";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import styled from "styled-components";
const { Header, Footer, Sider, Content } = Layout;
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contestApi from "../api/contestApi";

const StyledSpan = styled.span`
  text-align: right;
  color: #fff;
`;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [sidebarItems, setSidebarItems] = useState([
    {
      key: 1,
      label: "Make contest",
      icon: React.createElement(NotificationOutlined),
      children: [],
    },
    {
      key: 4,
      label: "Bunker",
      icon: React.createElement(LaptopOutlined),
      children: [
        {
          key: 41,
          label: "Create",
        },
        {
          key: 42,
          label: "Add questions",
        },
      ],
    },
    {
      key: 2,
      label: "Contest",
      icon: React.createElement(UserOutlined),
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
      icon: React.createElement(BarChartOutlined),
    },
  ]);
  const [links, setLinks] = useState([
    { key: 21, link: `/contest/create` },
    { key: 22, link: `/contest/assign-participants` },
    { key: 3, link: `/result` },
    { key: 41, link: `/bunker/create` },
    { key: 42, link: `/bunker/add-questions` },
  ]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await contestApi.getAllContests();

        let tmpSidebarItems = [...sidebarItems];
        const tmpLinks = [...links];

        response.data.data.forEach((contest) => {
          const contestTmp = {
            key: contest._id,
            label: contest.title,
          };
          const linkTmp = {
            key: contest._id,
            link: `/contest/${contest._id}`,
          };
          tmpLinks.push(linkTmp);
          tmpSidebarItems = tmpSidebarItems.map((item) => {
            if (item.key == 1) {
              return {
                ...item,
                children: [...item.children, contestTmp],
              };
            }

            return item;
          });

          setSidebarItems(tmpSidebarItems);
          setLinks(tmpLinks);
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleClickSidebar = (e) => {
    const foundItem = links.find((link) => link.key == e.key);
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
                You are logging as {userData?.username}.{" "}
                <span
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("userData");
                    router.push("/login");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Log out
                </span>
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default MyApp;
