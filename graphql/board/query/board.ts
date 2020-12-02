import { gql } from "@apollo/client"

export const boardQuery = gql`
  query Board($id: String!) {
    board(id: $id) {
      id
      name
      lists {
        id
        name
        cards {
          id
          name
          index
        }
      }
    }
  }
`
