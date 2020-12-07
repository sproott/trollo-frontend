import { gql } from "@apollo/client/core"

export const currentUser = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`
