import gql from "graphql-tag"

export const currentUser = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`

export const teams = gql`
  query Teams {
    currentUser {
      ...UserTeamsInfo
    }
  }
`
