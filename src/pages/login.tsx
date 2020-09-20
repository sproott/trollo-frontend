import React from "react"
import LoginForm from "../components/login/LoginForm"
import { Layout } from "antd"
import { H1 } from "../components/common/Text"
import { blue } from "@ant-design/colors"

const { Header, Footer, Sider, Content } = Layout

const Login = () => {
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Header style={{ backgroundColor: blue.primary }}>
        <H1 textAlign="center" color="white">
          Login page
        </H1>
      </Header>
      <Content
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <H1 textAlign="center" style={{ marginBottom: "50px" }}>
          Login to the app
        </H1>
        <LoginForm />
      </Content>
    </Layout>
  )
}

export default Login
