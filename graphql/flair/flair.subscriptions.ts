import gql from "graphql-tag"

export const flairCreated = gql`
  subscription FlairCreated($teamId: String!) {
    flairCreated(teamId: $teamId) {
      ...FlairInfo
    }
  }
`

export const flairUpdated = gql`
  subscription FlairUpdated($teamId: String!) {
    flairUpdated(teamId: $teamId) {
      ...FlairInfo
    }
  }
`

export const flairDeleted = gql`
  subscription FlairDeleted($teamId: String!) {
    flairDeleted(teamId: $teamId) {
      flairId
    }
  }
`

export const flairAssigned = gql`
  subscription FlairAssigned($teamId: String!) {
    flairAssigned(teamId: $teamId) {
      flairId
      cardId
    }
  }
`

export const flairUnassigned = gql`
  subscription FlairUnassigned($teamId: String!) {
    flairUnassigned(teamId: $teamId) {
      flairId
      cardId
    }
  }
`
