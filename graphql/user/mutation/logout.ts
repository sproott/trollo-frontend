import { gql } from "@apollo/client"

export const logout = gql`
  mutation Logout {
    logout
  }
`
