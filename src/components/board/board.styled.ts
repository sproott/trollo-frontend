import { ArrowLeftOutlined } from "@ant-design/icons"
import Box from "../common/util/Box"
import styled from "styled-components"
import theme from "../../style/theme"

const InnerBase = styled.div`
  border-radius: 5px;
`

export const CardInner = styled(InnerBase)<{ isDragging: boolean }>`
  position: relative;
  font-size: small;
  cursor: pointer;
  padding: 20px;
  margin: 0 8px 8px 8px;
  user-select: none;
  color: white;
  background-color: ${theme.blue.primary};
  overflow-wrap: anywhere;

  &::after {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 5px;
    box-shadow: 5px -5px 4px 1px rgba(58, 179, 255, 0.3);
    opacity: ${({ isDragging }) => (isDragging ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  }
`

export const CreateCardButton = styled(InnerBase)`
  font-size: medium;
  cursor: pointer;
  padding: 20px;
  margin: 0 8px 8px 8px;
  user-select: none;
  background-color: white;
  color: ${theme.blue.primary};
  border: 3px dashed ${theme.blue.primary};
  transition: 0.3s;

  :hover {
    color: ${theme.blue.primary};
    background-color: ${theme.blue[0]};
  }
`

export const ArrowBack = styled(ArrowLeftOutlined)`
  font-size: 24px;
  cursor: pointer;
  width: 30px;
`

export const FlairBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 5px;
`
