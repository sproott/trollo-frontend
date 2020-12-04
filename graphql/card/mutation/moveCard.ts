import { gql } from "@apollo/client/core"

export const moveCard = gql`
  mutation MoveCard($destinationIndex: Int!, $listId: String, $cardId: String!) {
    moveCard(destinationIndex: $destinationIndex, listId: $listId, cardId: $cardId)
  }
`
