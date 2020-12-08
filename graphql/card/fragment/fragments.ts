import { gql } from "@apollo/client/core"

export const fragments = gql`
  fragment BoardQueryCard on Card {
    id
    name
    description
    assignee {
      ...UserInfo
    }
    index
  }
`
