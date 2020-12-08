import { gql } from "@apollo/client/core"

export const teams = gql`
  query Teams {
    currentUser {
      ...UserTeamsInfo
    }
  }
`
