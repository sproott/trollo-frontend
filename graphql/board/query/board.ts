import { gql } from "@apollo/client"

export const boardQuery = gql`
  query Board($id: String!) {
    board(id: $id) {
      id
      name
      isOwn
      lists {
        id
        name
        index
        cards {
          id
          name
          index
        }
      }
    }
  }
`
