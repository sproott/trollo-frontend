import styled from "styled-components"

export type TextProps = {
  color?: string
  textAlign?: "center" | "left" | "right" | "justify"
}

const styledWithTextProps = (tagName: any) => {
  return styled(tagName)<TextProps>`
    color: ${({ color }) => color ?? "black"};
    text-align: ${({ textAlign }) => textAlign ?? "left"};
    margin-bottom: 0;
  `
}

export const H0 = styled(styledWithTextProps("h1"))`
  font-size: x-large;
`
export const H1 = styledWithTextProps("h1")
export const H2 = styledWithTextProps("h2")
export const H3 = styledWithTextProps("h3")
export const H4 = styledWithTextProps("h4")
export const H5 = styledWithTextProps("h5")

export const Text = styled(styledWithTextProps("div"))`
  font-size: 14px;
`
