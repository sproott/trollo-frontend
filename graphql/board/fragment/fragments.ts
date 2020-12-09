import { gql } from "@apollo/client/core"

export const TeamsQueryBoard = gql`
  fragment TeamsQueryBoard on Board {
    id
    name
  }
`
