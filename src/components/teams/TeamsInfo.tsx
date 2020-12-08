import React from "react"
import { TeamsQueryTeamFragment } from "../../../generated/graphql"
import TeamInfo from "./TeamInfo"

const TeamsInfo = ({ teams, isOwn }: { teams: Array<TeamsQueryTeamFragment>; isOwn?: boolean }) => {
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
