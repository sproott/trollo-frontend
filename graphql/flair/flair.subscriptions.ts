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
