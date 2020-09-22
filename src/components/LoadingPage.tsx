import React from "react"
import { Header, Layout } from "./common/page.styled"
import { Spin } from "antd"
import Box from "./common/Box"
import Logo from "./common/Logo"

const LoadingPage = () => {
  return (
    <Layout style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <Header>
        <Logo />
      </Header>
      <Box
        style={{ backgroundColor: "white", flexGrow: 1 }}
        flex
        justifyContent="center"
        alignItems="center"
      >
        <Spin size="large" tip="Loading..." />
      </Box>
    </Layout>
  )
}

export default LoadingPage
