import React from "react"
import { BoardButton, BoardTitle } from "./teams.styled"
import { Tooltip } from "antd"
import Link from "next/link"

const BoardInfo = ({ id, name }: { id: string; name: string }) => {
  return (
    <Link as={`/board/${id}`} href="/board/[boardId]">
      <BoardButton>
        <Tooltip mouseEnterDelay={1} placement="bottomLeft" title={name}>
          <BoardTitle>{name}</BoardTitle>
        </Tooltip>
      </BoardButton>
    </Link>
  )
}

export default BoardInfo
