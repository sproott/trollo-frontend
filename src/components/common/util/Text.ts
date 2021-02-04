import * as React from "react"

import styled, { StyledComponent } from "styled-components"

export type TextProps = {
  color?: string
  textAlign?: "center" | "left" | "right" | "justify"
}

const styledWithTextProps = <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
  tagName: C
) => {
  return styled(tagName)<TextProps>`
    color: ${({ color }) => color ?? "black"};
    text-align: ${({ textAlign }) => textAlign ?? "left"};
    margin-bottom: 0;
  ` as StyledComponent<C, unknown, Record<string, unknown> & TextProps, string | number | symbol>
}

export const H0 = styled(styledWithTextProps("h1"))`
  font-size: x-large;
`
export const H1 = styledWithTextProps("h1")
export const H2 = styledWithTextProps("h2")
export const H3 = styledWithTextProps("h3")
export const H4 = styledWithTextProps("h4")
export const H5 = styledWithTextProps("h5")

export const Div = styled(styledWithTextProps("div"))`
  font-size: 14px;
`

export const LineClamp = styled.div<{ numLines?: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ numLines }) => numLines ?? 2};
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: break-word;
`
