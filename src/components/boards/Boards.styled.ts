import styled from "styled-components"
import theme from "../../style/theme"

export const BoardButton = styled.a`
  background-color: ${theme.blue.primary};
  color: white;
  font-size: small;
  text-decoration: none;
  border-radius: 5px;
  height: 80px;
  padding: 15px;
  transition: 0.3s;

  :hover {
    color: white;
    background-color: ${theme.blue[6]};
  }
`

export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: auto auto;
  grid-gap: 10px;
`
