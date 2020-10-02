import React, { ReactChild } from "react"
import Box, { BoxProps } from "./Box"

const Centered = ({ children, ...boxProps }: { children: ReactChild; boxProps?: BoxProps }) => {
  return (
    <Box {...boxProps} flex justifyContent="center">
      {children}
    </Box>
  )
}

export default Centered
