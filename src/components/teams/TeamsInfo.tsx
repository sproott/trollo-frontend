import React from "react"
import { TeamInfoFragment } from "../../../generated/graphql"
import { Card } from "antd"
import BoardInfo from "./BoardInfo"
import { BoardGrid } from "./teams.styled"
import NewBoardButton from "./NewBoardButton"

const TeamsInfo = ({
  teams,
  isOwn,
}: {
  teams: Array<{ __typename?: "Team" } & TeamInfoFragment>
  isOwn?: boolean
}) => {
  return (
    <div style={{ paddingTop: "10px" }}>
      {teams.map((team) => {
        return (
          <Card title={team.name} key={team.id} style={{ marginBottom: "10px" }}>
            <BoardGrid style={{ padding: "10px 10px 0 10px" }}>
              {team.boards?.map((board) => {
                return <BoardInfo name={board.name} id={board.id} key={board.id} />
              })}
              {isOwn && <NewBoardButton team={team} />}
            </BoardGrid>
          </Card>
        )
      })}
    </div>
  )
}

export default TeamsInfo
