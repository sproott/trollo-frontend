import { gql } from "@apollo/client/core"

export const leaveTeam = gql`
  mutation LeaveTeam($teamId: String!) {
    leaveTeam(teamId: $teamId)
  }
`
