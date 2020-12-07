import { gql } from "@apollo/client/core"

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
          description
          assignee {
            id
            username
          }
          index
        }
      }
      team {
        id
        participants {
          user {
            id
            username
          }
        }
      }
    }
  }
`
