import styled from "styled-components"
import theme from "../../style/theme"

const InnerBase = styled.div`
  border-radius: 5px;
`

export const ListInner = styled(InnerBase)`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding: 5px;
  margin: 10px;
`

export const CardInner = styled(InnerBase)`
  font-size: 14px;
  cursor: pointer;
  padding: 20px;
  margin: 0 8px 8px 8px;
  user-select: none;
  color: white;
  background-color: ${() => theme.blue.primary};
`
