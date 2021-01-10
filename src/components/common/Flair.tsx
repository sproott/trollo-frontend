import React, { useState } from "react"
import styled, { CSSProperties } from "styled-components"

import Box from "./util/Box"
import ColorPicker from "./ColorPicker"
import Modal from "antd/lib/modal/Modal"
import { Tag } from "antd"
import { generate } from "@ant-design/colors"

const textColorIndex = 7

const NonZeroHeightSpan = styled.span`
  &:empty::before {
    content: "\\200b"; // unicode zero width space character
  }
`

export const Flair = ({
  label,
  hue,
  style,
  icon,
  onClick,
}: {
  label: string
  hue: number
  style?: CSSProperties
  icon?: (color: string) => React.ReactNode
  onClick?: () => void
}) => {
  const colors = generate(`hsl(${hue}, 100%, 50%)`)

  return (
    <Tag
      color={colors[0]}
      style={{
        ...style,
        color: colors[textColorIndex],
        border: `1px solid ${colors[textColorIndex]}`,
        transition: "none",
        cursor: "pointer",
      }}
      onClick={onClick}
      closable={!!icon}
      closeIcon={icon && icon(colors[textColorIndex])}
      onClose={(event) => {
        event.preventDefault()
      }}
    >
      <NonZeroHeightSpan>{label}</NonZeroHeightSpan>
    </Tag>
  )
}
