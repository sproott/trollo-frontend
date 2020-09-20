import React, { ReactChild } from "react"
import Box from "./Box"

const Centered = ({ children }: { children: ReactChild }) => {
  return (
    <Box flex justifyContent="center">
      {children}
    </Box>
  )
}

export default Centered
