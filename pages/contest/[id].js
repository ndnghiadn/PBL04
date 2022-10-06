import { Breadcrumb, Button, Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";

const MakeContestPage = () => {
  const handleStartContest = () => {
    const text = "Are you sure to start doing the contest?";
    if (confirm(text) === true) {
      window.open(
        "/contest/doing/123",
        "popUpWindow",
        "height=1080,width=1920,left=0,top=0,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes"
      );
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
        <Breadcrumb.Item>Make contest</Breadcrumb.Item>
        <Breadcrumb.Item>Khoa hoc du lieu 16.9</Breadcrumb.Item>
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
          <div>
            <h2>Lesson: Khoa hoc du lieu 16.9</h2>
            <h3>Type: Final exam. Duration: 60mins</h3>
            <span>
              Check the result after committing your work before logging out.
            </span>
          </div>
          <Button onClick={handleStartContest} type="primary" size="large">
            START
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default MakeContestPage;
