import { Layout as _Layout } from "antd"
import styled from "styled-components"
import theme from "../../style/theme"

const { Header: _Header, Content: _Content } = _Layout

export const Layout = styled(_Layout)`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled(_Header)`
  background-color: ${theme.blue.primary};
`

export const Content = styled(_Content)`
  background-color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
`

export const CenteredContent = styled(Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
