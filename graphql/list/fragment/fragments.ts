import { gql } from "@apollo/client/core"

export const fragments = gql`
  fragment BoardQueryList on List {
    id
    name
    index
    cards {
      ...BoardQueryCard
    }
  }
`
