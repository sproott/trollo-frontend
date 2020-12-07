import { gql } from "@apollo/client/core"

export const renameBoard = gql`
  mutation RenameBoard($name: String!, $boardId: String!) {
    renameBoard(name: $name, boardId: $boardId) {
      success
      exists
    }
  }
`
