import gql from "graphql-tag"

export const CreateList = gql`
  mutation createList($boardId: String!, $name: String!) {
    createList(boardId: $boardId, name: $name) {
      list {
        id
        name
      }
      exists
    }
  }
`
