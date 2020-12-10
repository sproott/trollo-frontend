import { gql } from "@apollo/client/core"

export const updateCardDescription = gql`
  mutation UpdateCardDescription($description: String!, $cardId: String!) {
    updateCardDescription(description: $description, cardId: $cardId)
  }
`

export const createCard = gql`
  mutation createCard($listId: String!, $name: String!, $description: String) {
    createCard(listId: $listId, name: $name, description: $description) {
      card {
        id
        name
        description
        index
      }
      exists
    }
  }
`

export const deleteCard = gql`
  mutation DeleteCard($id: String!) {
    deleteCard(id: $id)
  }
`

export const moveCard = gql`
  mutation MoveCard($destinationIndex: Int!, $listId: String, $cardId: String!) {
    moveCard(destinationIndex: $destinationIndex, listId: $listId, cardId: $cardId)
  }
`

export const renameCard = gql`
  mutation RenameCard($name: String!, $cardId: String!) {
    renameCard(name: $name, cardId: $cardId) {
      success
      exists
    }
  }
`

export const assignUser = gql`
  mutation AssignUser($userId: String!, $cardId: String!) {
    assignUser(userId: $userId, cardId: $cardId)
  }
`

export const unassignUser = gql`
  mutation UnassignUser($cardId: String!) {
    unassignUser(cardId: $cardId)
  }
`
