import gql from "graphql-tag"

export const listCreated = gql`
  subscription listCreated($boardId: ID!) {
    listCreated(boardId: $boardId) {
      id
      name
      index
    }
  }
`

export const listRenamed = gql`
  subscription listRenamed($boardId: ID!) {
    listRenamed(boardId: $boardId) {
      id
      name
    }
  }
`

export const listMoved = gql`
  subscription listMoved($boardId: ID!) {
    listMoved(boardId: $boardId) {
      list {
        id
        index
      }
      sourceIndex
      destinationIndex
    }
  }
`

export const listDeleted = gql`
  subscription listDeleted($boardId: ID!) {
    listDeleted(boardId: $boardId)
  }
`
