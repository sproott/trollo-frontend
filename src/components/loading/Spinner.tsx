import Box from "../common/util/Box"
import React from "react"
import { Spin } from "antd"

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
