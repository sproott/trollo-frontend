import { gql } from "@apollo/client/core"

export const BoardQueryList = gql`
  fragment BoardQueryList on List {
    id
    name
    index
    cards {
      ...BoardQueryCard
    }
  }
`
