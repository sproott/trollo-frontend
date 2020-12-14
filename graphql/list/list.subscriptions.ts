import { gql } from "@apollo/client/core"

export const listCreated = gql`
  subscription ListCreated($boardId: String!) {
    listCreated(boardId: $boardId) {
      id
      name
      index
    }
  }
`

export const listRenamed = gql`
  subscription ListRenamed($boardId: String!) {
    listRenamed(boardId: $boardId) {
      id
      name
    }
  }
`

export const listMoved = gql`
  subscription ListMoved($boardId: String!) {
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
  subscription ListDeleted($boardId: String!) {
    listDeleted(boardId: $boardId)
  }
`
