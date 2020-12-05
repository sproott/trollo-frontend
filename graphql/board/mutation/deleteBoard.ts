import { gql } from "@apollo/client"

export const deleteBoard = gql`
  mutation DeleteBoard($id: String!) {
    deleteBoard(id: $id)
  }
`
