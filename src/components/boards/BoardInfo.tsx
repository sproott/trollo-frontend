import React from "react"
import { BoardButton } from "./Boards.styled"

const BoardInfo = ({ name }: { name: string }) => {
  return (
    <BoardButton>
      <div>{name}</div>
    </BoardButton>
  )
}

export default BoardInfo
