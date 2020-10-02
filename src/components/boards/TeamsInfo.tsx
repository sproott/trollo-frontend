import React from "react"
import { TeamInfoFragment } from "../../../generated/graphql"
import { Card } from "antd"
import BoardInfo from "./BoardInfo"
import { BoardGrid } from "./Boards.styled"

const TeamsInfo = ({ teams }: { teams: Array<{ __typename?: "Team" } & TeamInfoFragment> }) => {
  return (
    <div style={{ paddingTop: "10px" }}>
      {teams.map((team) => {
        return (
          <Card title={team.name} key={team.id} style={{ marginBottom: "10px" }}>
            {team.boards ? (
              <BoardGrid style={{ padding: "10px 10px 0 10px" }}>
                {team.boards.map((board) => {
                  return <BoardInfo name={board.name} key={board.id} />
                })}
              </BoardGrid>
            ) : (
              <div>empty</div>
            )}
          </Card>
        )
      })}
    </div>
  )
}

export default TeamsInfo
