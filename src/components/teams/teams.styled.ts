import styled from "styled-components"
import theme from "../../style/theme"

const BoardButtonBase = styled.a`
  font-size: small;
  text-decoration: none;
  border-radius: 5px;
  height: 80px;
  padding: 15px;
  transition: 0.3s;
`

export const BoardButton = styled(BoardButtonBase)`
  background-color: ${theme.blue.primary};
  color: white;
  font-size: small;

  :hover {
    color: white;
    background-color: ${theme.blue[6]};
  }
`

export const CreateBoardButton = styled(BoardButtonBase)`
  background-color: white;
  font-size: medium;
  color: ${theme.blue.primary};
  border: 3px dashed ${theme.blue.primary};

  :hover {
    color: ${theme.blue.primary};
    background-color: ${theme.blue[0]};
  }
`

export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: auto auto;
  grid-gap: 10px;
`
