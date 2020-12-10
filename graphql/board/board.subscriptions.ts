import { gql } from "@apollo/client/core"

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
  subscription BoardRenamed {
    boardRenamed {
      id
      name
      isOwn
    }
  }
`

export const boardDeleted = gql`
  subscription BoardDeleted {
    boardDeleted
  }
`
