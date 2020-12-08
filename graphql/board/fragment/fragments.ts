import { gql } from "@apollo/client/core"

export const fragments = gql`
  fragment TeamsQueryBoard on Board {
    id
    name
  }
`
