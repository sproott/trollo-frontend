import { gql } from "@apollo/client"

export const addUser = gql`
  mutation AddUser($username: String!, $teamId: String!) {
    addUser(username: $username, teamId: $teamId) {
      userId
      username
      alreadyInTeam
      doesNotExist
    }
  }
`
