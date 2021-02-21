import gql from "graphql-tag"

export const board = gql`
  query board($id: ID!) {
    board(id: $id) {
      ...BoardQueryBoard
    }
  }
`
