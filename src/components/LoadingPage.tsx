import React from "react"
import { Header } from "./common/page.styled"
import { Spin } from "antd"
import Box from "./common/Box"
import { H1 } from "./common/Text"

const LoadingPage = () => {
  return (
    <>
      <Box style={{ minHeight: "100%" }} flex flexDirection="column">
        <Header>
          <H1 color="white">Trollo</H1>
        </Header>
        <Box style={{ flexGrow: 1 }} flex justifyContent="center" alignItems="center">
          <Spin size="large" tip="Loading..." />
        </Box>
      </Box>
    </>
  )
}

export default LoadingPage
