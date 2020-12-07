import { gql } from "@apollo/client/core"

export const logout = gql`
  mutation Logout {
    logout
  }
`
