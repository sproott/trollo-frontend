import styled from "styled-components"

const Box = styled.div<{
  flex?: boolean
  alignItems?: AlignItems
  justifyContent?: JustifyContent
  flexDirection?: FlexDirection
  padding?: string
  fullWidth?: boolean
}>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  display: ${({ flex }) => (flex ? "flex" : "block")};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ flexDirection }) => flexDirection};
  padding: ${({ padding }) => padding};
`

export type AlignItems = "stretch" | "center" | "flex-start" | "flex-end"

export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"

export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse"

export default Box
