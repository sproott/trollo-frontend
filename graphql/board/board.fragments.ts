import gql from "graphql-tag"

export const TeamsQueryBoard = gql`
  fragment TeamsQueryBoard on Board {
    id
    name
  }
`

export const BoardQueryBoard = gql`
  fragment BoardQueryBoard on Board {
    id
    name
    isOwn
    lists {
      ...BoardQueryList
    }
    team {
      ...BoardQueryTeam
    }
  }
`
