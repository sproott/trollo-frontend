import { gql } from "@apollo/client"

export const renameBoard = gql`
  mutation RenameBoard($name: String!, $boardId: String!) {
    renameBoard(name: $name, boardId: $boardId) {
      success
      exists
    }
  }
`
