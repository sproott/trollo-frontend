import { gql } from "@apollo/client/core"

export const createBoard = gql`
  mutation CreateBoard($teamId: String!, $name: String!) {
    createBoard(teamId: $teamId, name: $name) {
      board {
        id
        name
      }
      exists
    }
  }
`

export const deleteBoard = gql`
  mutation DeleteBoard($id: String!) {
    deleteBoard(id: $id)
  }
`

export const renameBoard = gql`
  mutation RenameBoard($name: String!, $boardId: String!) {
    renameBoard(name: $name, boardId: $boardId) {
      success
      exists
    }
  }
`
