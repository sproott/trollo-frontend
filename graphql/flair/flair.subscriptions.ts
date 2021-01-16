import gql from "graphql-tag"

export const flairCreated = gql`
  subscription flairCreated($teamId: ID!) {
    flairCreated(teamId: $teamId) {
      ...FlairInfo
    }
  }
`

export const flairUpdated = gql`
  subscription flairUpdated($teamId: ID!) {
    flairUpdated(teamId: $teamId) {
      ...FlairInfo
    }
  }
`

export const flairDeleted = gql`
  subscription flairDeleted($teamId: ID!) {
    flairDeleted(teamId: $teamId) {
      flairId
    }
  }
`

export const flairAssigned = gql`
  subscription flairAssigned($teamId: ID!) {
    flairAssigned(teamId: $teamId) {
      flairId
      cardId
    }
  }
`

export const flairUnassigned = gql`
  subscription flairUnassigned($teamId: ID!) {
    flairUnassigned(teamId: $teamId) {
      flairId
      cardId
    }
  }
`
