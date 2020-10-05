import styled from "styled-components"
import { Button as AntdButton } from "antd"
import React, { ReactChildren, ReactElement } from "react"
import theme from "../../style/theme"

export const Button = styled(AntdButton)`
  :hover {
    color: ${theme.blue[1]};
    border-color: ${theme.blue[1]};
  }

  :not(:hover) {
    color: white;
    border-color: white;
  }
`
