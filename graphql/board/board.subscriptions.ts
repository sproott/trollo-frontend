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
  subscription BoardRenamed($boardId: String) {
    boardRenamed(boardId: $boardId) {
      id
      name
      isOwn
    }
  }
`

export const boardDeleted = gql`
  subscription BoardDeleted($boardId: String) {
    boardDeleted(boardId: $boardId)
  }
`
