import { gql } from "@apollo/client"

export const currentUserQuery = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`
