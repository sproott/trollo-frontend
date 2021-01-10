import styled from "styled-components"

export type BoxProps = {
  flex?: boolean
  alignItems?: AlignItems
  justifyContent?: JustifyContent
  flexDirection?: FlexDirection
  flexWrap?: FlexWrap
  padding?: string
  fullWidth?: boolean
  gap?: string
}

const Box = styled.div<BoxProps>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  display: ${({ flex }) => (flex ? "flex" : "block")};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ flexDirection }) => flexDirection};
  padding: ${({ padding }) => padding};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  gap: ${({ gap }) => gap};
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

export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse"

export default Box
