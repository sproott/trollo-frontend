import { gql } from "@apollo/client/core"

export const moveList = gql`
  mutation MoveList($destinationIndex: Int!, $listId: String!) {
    moveList(destinationIndex: $destinationIndex, listId: $listId)
  }
`
