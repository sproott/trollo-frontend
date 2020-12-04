import styled from "styled-components"
import theme from "../../style/theme"

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
