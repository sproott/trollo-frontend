import React, { ReactChild } from "react"
import Box from "./Box"

function Centered({ children }: { children: ReactChild }) {
  return (
    <Box flex justifyContent="center">
      {children}
    </Box>
  )
}

export default Centered
