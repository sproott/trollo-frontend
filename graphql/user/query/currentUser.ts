import { gql } from "@apollo/client"

export const currentUser = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`
