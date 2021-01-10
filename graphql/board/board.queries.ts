import gql from "graphql-tag"

export const boardQuery = gql`
  query Board($id: String!) {
    board(id: $id) {
      ...BoardQueryBoard
    }
  }
`
