import { gql } from "@apollo/client/core"

export const createTeamMutation = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      team {
        ...TeamInfo
      }
      exists
    }
  }
`
