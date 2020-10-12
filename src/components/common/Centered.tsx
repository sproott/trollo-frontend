import React, { CSSProperties, ReactChild } from "react"
import Box, { BoxProps } from "./Box"

interface CenteredProps extends BoxProps {
  children: React.ReactNode
  style?: CSSProperties
}

export const HorizontallyCentered = ({ children, ...other }: CenteredProps) => {
  return (
    <Box {...other} flex justifyContent="center">
      {children}
    </Box>
  )
}

export const Centered = ({ children, ...other }: CenteredProps) => {
  return (
    <Box {...other} flex justifyContent="center" alignItems="center">
      {children}
    </Box>
  )
}
