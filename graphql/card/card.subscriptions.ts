import gql from "graphql-tag"

export const cardCreated = gql`
  subscription cardCreated($boardId: ID!) {
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
  subscription cardMoved($boardId: ID!) {
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
  subscription cardUpdated($boardId: ID!) {
    cardUpdated(boardId: $boardId) {
      id
      name
      description
    }
  }
`

export const cardDeleted = gql`
  subscription cardDeleted($boardId: ID!) {
    cardDeleted(boardId: $boardId) {
      cardId
    }
  }
`

export const cardUserAssigned = gql`
  subscription cardUserAssigned($boardId: ID!) {
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
  subscription cardUserUnassigned($boardId: ID!) {
    cardUserUnassigned(boardId: $boardId) {
      cardId
    }
  }
`
