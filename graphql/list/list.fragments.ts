import gql from "graphql-tag"

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
