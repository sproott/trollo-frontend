import { gql } from "@apollo/client/core"

export const updateCardDescription = gql`
  mutation UpdateCardDescription($description: String!, $cardId: String!) {
    updateCardDescription(description: $description, cardId: $cardId)
  }
`
