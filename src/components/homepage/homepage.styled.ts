import styled from "styled-components"
import theme from "../../style/theme"
import { ArrowRightOutlined } from "@ant-design/icons"

export const HomepageHeader = styled.div`
  color: white;
  font-size: 36px;
`

export const HomepageLink = styled(HomepageHeader)`
  cursor: pointer;
  transition: 0.3s;

  :hover {
    color: ${theme.blue[0]};
  }
`

export const TryItArrow = styled(ArrowRightOutlined)`
  color: white;
  font-size: 32px;
  cursor: pointer;
  padding-left: 10px;

  transition: 0.3s;

  :hover {
    color: ${theme.blue[0]};
  }
`
