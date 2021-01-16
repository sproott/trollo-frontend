import gql from "graphql-tag"

export const boardQuery = gql`
  query board($id: ID!) {
    board(id: $id) {
      ...BoardQueryBoard
    }
  }
`
