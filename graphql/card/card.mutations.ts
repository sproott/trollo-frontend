import gql from "graphql-tag"

export const updateCardDescription = gql`
  mutation updateCardDescription($description: String!, $cardId: ID!) {
    updateCardDescription(description: $description, cardId: $cardId)
  }
`

export const createCard = gql`
  mutation createCard($listId: ID!, $name: String!, $description: String) {
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
  mutation deleteCard($id: ID!) {
    deleteCard(id: $id)
  }
`

export const moveCard = gql`
  mutation moveCard($destinationIndex: Int!, $listId: ID, $cardId: ID!) {
    moveCard(destinationIndex: $destinationIndex, listId: $listId, cardId: $cardId)
  }
`

export const renameCard = gql`
  mutation renameCard($name: String!, $cardId: ID!) {
    renameCard(name: $name, cardId: $cardId) {
      success
      exists
    }
  }
`

export const assignUser = gql`
  mutation assignUser($userId: ID!, $cardId: ID!) {
    assignUser(userId: $userId, cardId: $cardId)
  }
`

export const unassignUser = gql`
  mutation unassignUser($cardId: ID!) {
    unassignUser(cardId: $cardId)
  }
`
