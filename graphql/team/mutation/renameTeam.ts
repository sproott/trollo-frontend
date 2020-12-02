import { gql } from "@apollo/client"

export const renameTeam = gql`
  mutation RenameTeam($name: String!, $teamId: String!) {
    renameTeam(name: $name, teamId: $teamId) {
      success
      exists
    }
  }
`
