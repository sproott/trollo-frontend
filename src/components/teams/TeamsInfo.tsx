import React from "react"
import { TeamInfoFragment } from "../../../generated/graphql"
import TeamInfo from "./TeamInfo"

const TeamsInfo = ({ teams, isOwn }: { teams: TeamInfoFragment[]; isOwn?: boolean }) => {
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
