import { gql } from "@apollo/client/core"

export const login = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      username
      email
    }
  }
`
