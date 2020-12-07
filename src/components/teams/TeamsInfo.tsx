import React from "react"
import { TeamInfoFragment, TeamsQuery } from "../../../generated/graphql"
import { Button, Card } from "antd"
import BoardInfo from "./BoardInfo"
import { BoardGrid } from "./teams.styled"
import NewBoardButton from "./NewBoardButton"
import { CardInner } from "../board/board.styled"
import { EditOutlined } from "@ant-design/icons"
import TeamInfo from "./TeamInfo"

const TeamsInfo = ({
  teams,
  isOwn,
}: {
  teams: Array<TeamsQuery["currentUser"]["owns"][0]["team"]>
  isOwn?: boolean
}) => {
  return (
    <div style={{ paddingTop: "10px" }}>
      {[...teams]
        .sort((t1, t2) => t1.name.localeCompare(t2.name))
        .map((team) => {
          return <TeamInfo key={team.id} team={team} isOwn={isOwn} />
        })}
    </div>
  )
}

export default TeamsInfo
