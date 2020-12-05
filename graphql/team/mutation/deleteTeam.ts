import { gql } from "@apollo/client"

export const deleteTeam = gql`
  mutation DeleteTeam($id: String!) {
    deleteTeam(id: $id)
  }
`
