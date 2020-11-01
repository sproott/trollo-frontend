import styled from "styled-components"
import { Button as _Button } from "antd"
import React, { ReactChildren, ReactElement } from "react"
import theme from "../../style/theme"

export const Button = styled(_Button)`
  :hover {
    color: ${theme.blue[1]};
    border-color: ${theme.blue[1]};
  }

  :not(:hover) {
    color: white;
    border-color: white;
  }
`
