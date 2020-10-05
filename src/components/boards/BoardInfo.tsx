import React from "react"
import { BoardButton, BoardTitle } from "./Boards.styled"
import { Tooltip } from "antd"

const BoardInfo = ({ name }: { name: string }) => {
  return (
    <BoardButton>
      <Tooltip mouseEnterDelay={1} placement="bottomLeft" title={name}>
        <BoardTitle>{name}</BoardTitle>
      </Tooltip>
    </BoardButton>
  )
}

export default BoardInfo
