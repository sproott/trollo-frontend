import { gql } from "@apollo/client/core"

export const unassignUser = gql`
  mutation UnassignUser($cardId: String!) {
    unassignUser(cardId: $cardId)
  }
`
