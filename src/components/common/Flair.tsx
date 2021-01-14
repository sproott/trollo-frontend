import React, { DOMAttributes, ForwardedRef, HTMLAttributes, forwardRef } from "react"
import styled, { CSSProperties } from "styled-components"

import { Tag } from "antd"
import { generate } from "@ant-design/colors"

const textColorIndex = 7

const NonZeroHeightSpan = styled.span`
  &:empty::before {
    content: "\\200b"; // unicode zero width space character
  }
`

export type FlairProps = {
  label: string
  hue: number
  style?: CSSProperties
  icon?: (color: string) => React.ReactNode
  onClick?: () => void
} & HTMLAttributes<HTMLSpanElement> &
  DOMAttributes<HTMLSpanElement>

export const Flair = forwardRef(
  ({ label, hue, icon, style, ...other }: FlairProps, ref: ForwardedRef<HTMLSpanElement>) => {
    const colors = generate(`hsl(${hue}, 100%, 50%)`)

    return (
      <Tag
        ref={ref}
        color={colors[0]}
        style={{
          color: colors[textColorIndex],
          border: `1px solid ${colors[textColorIndex]}`,
          transition: "none",
          cursor: "pointer",
          ...style,
        }}
        closable={!!icon}
        closeIcon={icon && icon(colors[textColorIndex])}
        {...other}
        onClose={(event) => {
          event.preventDefault()
        }}
      >
        <NonZeroHeightSpan>{label}</NonZeroHeightSpan>
      </Tag>
    )
  }
)
