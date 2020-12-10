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

export const logout = gql`
  mutation Logout {
    logout
  }
`

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
