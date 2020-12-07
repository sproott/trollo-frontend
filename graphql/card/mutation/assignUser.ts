import { gql } from "@apollo/client/core"

export const assignUser = gql`
  mutation AssignUser($userId: String!, $cardId: String!) {
    assignUser(userId: $userId, cardId: $cardId)
  }
`
