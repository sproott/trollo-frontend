import gql from "graphql-tag"

export const createBoard = gql`
  mutation createBoard($teamId: ID!, $name: String!) {
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
  mutation deleteBoard($id: ID!) {
    deleteBoard(id: $id)
  }
`

export const renameBoard = gql`
  mutation renameBoard($name: String!, $boardId: ID!) {
    renameBoard(name: $name, boardId: $boardId) {
      success
      exists
    }
  }
`
