import { gql } from "@apollo/client"

export const loginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      username
      email
    }
  }
`
