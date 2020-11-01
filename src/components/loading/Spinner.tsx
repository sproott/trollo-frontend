import React from "react"
import { Spin } from "antd"
import Box from "../common/Box"

const Spinner = () => {
  return (
    <Box
      style={{ backgroundColor: "white", flexGrow: 1 }}
      flex
      justifyContent="center"
      alignItems="center"
    >
      <Spin size="large" tip="Loading..." />
    </Box>
  )
}

export default Spinner
