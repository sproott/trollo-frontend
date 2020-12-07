import { gql } from "@apollo/client/core"

export const deleteBoard = gql`
  mutation DeleteBoard($id: String!) {
    deleteBoard(id: $id)
  }
`
