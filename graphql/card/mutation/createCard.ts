import gql from "graphql-tag"

export const CreateCard = gql`
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
