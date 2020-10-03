import styled from "styled-components"
import theme from "../../style/theme"

export const LogoStyled = styled.a`
  font-size: 36px;
  font-family: Pacifico, sans-serif;
  color: white;
  user-select: none !important;

  :hover {
    color: ${theme.blue[0]};
  }

  :not(:hover) {
    color: white;
  }
`
