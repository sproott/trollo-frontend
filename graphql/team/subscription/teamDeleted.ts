import { gql } from "@apollo/client/core"

export const teamDeleted = gql`
  subscription TeamDeleted {
    teamDeleted
  }
`
