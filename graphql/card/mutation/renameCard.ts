import { gql } from "@apollo/client/core"

export const renameCard = gql`
  mutation RenameCard($name: String!, $cardId: String!) {
    renameCard(name: $name, cardId: $cardId) {
      success
      exists
    }
  }
`
