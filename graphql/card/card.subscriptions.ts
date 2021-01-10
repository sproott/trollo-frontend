import gql from "graphql-tag"

export const cardCreated = gql`
  subscription CardCreated($boardId: String!) {
    cardCreated(boardId: $boardId) {
      card {
        id
        name
        description
      }
      listId
    }
  }
`

export const cardMoved = gql`
  subscription CardMoved($boardId: String!) {
    cardMoved(boardId: $boardId) {
      card {
        id
        index
      }
      sourceIndex
      destinationIndex
      destinationListId
    }
  }
`

export const cardUpdated = gql`
  subscription CardUpdated($boardId: String!) {
    cardUpdated(boardId: $boardId) {
      id
      name
      description
    }
  }
`

export const cardDeleted = gql`
  subscription CardDeleted($boardId: String!) {
    cardDeleted(boardId: $boardId) {
      cardId
    }
  }
`

export const cardUserAssigned = gql`
  subscription CardUserAssigned($boardId: String!) {
    cardUserAssigned(boardId: $boardId) {
      cardId
      boardId
      user {
        ...UserInfo
      }
    }
  }
`

export const cardUserUnassigned = gql`
  subscription CardUserUnassigned($boardId: String!) {
    cardUserUnassigned(boardId: $boardId) {
      cardId
    }
  }
`
