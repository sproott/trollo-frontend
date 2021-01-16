import gql from "graphql-tag"

export const boardCreated = gql`
  subscription BoardCreated {
    boardCreated {
      board {
        id
        name
        isOwn
      }
      teamId
    }
  }
`

export const boardRenamed = gql`
  subscription boardRenamed($boardId: ID) {
    boardRenamed(boardId: $boardId) {
      id
      name
      isOwn
    }
  }
`

export const boardDeleted = gql`
  subscription boardDeleted($boardId: ID) {
    boardDeleted(boardId: $boardId)
  }
`
