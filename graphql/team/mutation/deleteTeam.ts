import { gql } from "@apollo/client/core"

export const deleteTeam = gql`
  mutation DeleteTeam($id: String!) {
    deleteTeam(id: $id)
  }
`
