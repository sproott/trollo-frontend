import React from "react"
import { Header, Layout } from "./common/page.styled"
import { Spin } from "antd"
import Box from "./common/Box"
import { H1 } from "./common/Text"

const LoadingPage = () => {
  return (
    <Layout style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <Header>
        <H1 color="white">Trollo</H1>
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
