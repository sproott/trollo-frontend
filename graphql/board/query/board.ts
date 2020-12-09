import { gql } from "@apollo/client/core"

export const boardQuery = gql`
  query Board($id: String!) {
    board(id: $id) {
      ...BoardQueryBoard
    }
  }
`
