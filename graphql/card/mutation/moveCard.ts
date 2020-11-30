import {gql} from "@apollo/client/core"

export const moveCard = gql`
    mutation moveCard($destinationIndex: Int!, $listId: String, $cardId: String!) {
        moveCard(destinationIndex: $destinationIndex, listId: $listId, cardId: $cardId)
    }
`
