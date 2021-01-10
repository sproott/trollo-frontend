import gql from "graphql-tag"

export const BoardQueryCard = gql`
  fragment BoardQueryCard on Card {
    id
    name
    description
    assignee {
      ...UserInfo
    }
    flairs {
      ...FlairInfo
    }
    index
  }
`
