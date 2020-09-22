import React from "react"
import { Layout } from "./common/page.styled"
import { Spin } from "antd"
import Box from "./common/Box"
import Navbar from "./common/Navbar"

const LoadingPage = () => {
  return (
    <Layout style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar hideUserInfo />
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
