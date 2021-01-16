import gql from "graphql-tag"

export const login = gql`
  mutation login($input: LoginInput!) {
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
  mutation register($input: RegisterInput!) {
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
