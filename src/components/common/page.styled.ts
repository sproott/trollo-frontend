import { Layout as _Layout } from "antd"
import styled from "styled-components"
import { blue } from "@ant-design/colors"

const { Header: _Header } = _Layout

export const Layout = styled(_Layout)`
  min-height: 100%;
`

export const Header = styled(_Header)`
  background-color: ${blue.primary};
`
