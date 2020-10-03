import styled from "styled-components"
import { Button as AntdButton } from "antd"
import React, { ReactChildren, ReactElement } from "react"

export const Button = styled(AntdButton)`
  :hover {
    color: #a3daff;
    border-color: #a3daff;
  }

  :not(:hover) {
    color: white;
    border-color: white;
  }
`
