import { Breadcrumb, Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React from 'react'

const result = () => {
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
        <Breadcrumb.Item>Result</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        Result
      </Content>
    </Layout>
  )
}

export default result