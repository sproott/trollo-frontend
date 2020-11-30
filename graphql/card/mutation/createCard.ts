import gql from "graphql-tag"

export const CreateCard = gql`
    mutation createCard($listId: String!, $name: String!) {
        createCard(listId: $listId, name: $name) {
            card {
                id
                name
                index
            }
            exists
        }
    }
`
