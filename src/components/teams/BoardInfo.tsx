import { BoardButton } from "./teams.styled"
import { LineClamp } from "../common/util/Text"
import Link from "next/link"
import React from "react"
import { Tooltip } from "antd"

const BoardInfo = ({ id, name }: { id: string; name: string }) => {
  return (
    <Link as={`/board/${id}`} href="/board/[boardId]">
      <BoardButton>
        <Tooltip mouseEnterDelay={1} placement="bottomLeft" title={name}>
          <LineClamp>{name}</LineClamp>
        </Tooltip>
      </BoardButton>
    </Link>
  )
}

export default BoardInfo
