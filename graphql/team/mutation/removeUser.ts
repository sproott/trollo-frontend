import { gql } from "@apollo/client/core"

export const removeUser = gql`
  mutation RemoveUser($teamId: String!, $userId: String!) {
    removeUser(teamId: $teamId, userId: $userId)
  }
`
