import { gql } from "@apollo/client/core"

export const register = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        username
        email
      }
      error {
        username
        email
      }
    }
  }
`
